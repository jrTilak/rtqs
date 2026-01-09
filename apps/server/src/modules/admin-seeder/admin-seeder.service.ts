import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EntityManager } from '@mikro-orm/core';
import { User } from '../../common/db/entities/auth.entity';
import { ROLES } from '../../lib/auth';

@Injectable()
export class AdminSeederService implements OnModuleInit {
  private readonly logger = new Logger(AdminSeederService.name);

  constructor(
    private readonly em: EntityManager,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    await this.seedAdmin();
  }

  private async seedAdmin() {
    const adminEmail = this.configService.get<string>('SUPER_ADMIN_EMAIL');

    if (!adminEmail) {
      this.logger.warn('SUPER_ADMIN_EMAIL not set, skipping admin seeding.');
      return;
    }

    try {
      const exists = await this.em.findOne(User, { email: adminEmail });

      if (exists) {
        if (exists.role !== ROLES.ADMIN) {
          this.logger.log(
            `User ${adminEmail} exists but is not admin. Promoting to admin.`,
          );
          exists.role = ROLES.ADMIN;
          await this.em.flush();
        }
        return;
      }

      this.logger.log(`Creating super admin user: ${adminEmail}`);

      const adminUser = this.em.create(User, {
        email: adminEmail,
        name: 'Super Admin',
        role: ROLES.ADMIN,
        emailVerified: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await this.em.persist(adminUser).flush();
      this.logger.log('Super admin created successfully.');
    } catch (error) {
      this.logger.error('Failed to seed admin user', error);
    }
  }
}
