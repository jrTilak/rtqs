import { Module } from '@nestjs/common';
import { AdminSeederService } from './admin-seeder.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AdminSeederService],
  exports: [AdminSeederService],
})
export class AdminSeederModule {}
