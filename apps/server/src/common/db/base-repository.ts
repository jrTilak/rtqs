import { EntityRepository } from '@mikro-orm/postgresql';

export abstract class BaseRepository<
  T extends object,
> extends EntityRepository<T> {
  async getExistingIds(ids: string[]): Promise<string[]> {
    if (!ids.length) return [];

    const entities = await this.find(
      { id: { $in: ids } } as any,
      {
        fields: ['id'],
      } as any,
    );

    return entities.map((e: any) => e.id);
  }

  async existsOne(id: string): Promise<boolean> {
    const ids = await this.getExistingIds([id]);
    return ids.length === 1;
  }
}
