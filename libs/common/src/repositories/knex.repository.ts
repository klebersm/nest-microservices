import { Knex } from 'knex';

export class KnexRepository<T> {
  constructor(
    private readonly knex: Knex,
    private readonly tableName: string,
  ) {}

  public get table(): Knex.QueryBuilder {
    return this.knex(this.tableName);
  }

  async findById(id: number): Promise<T> {
    return this.table.where({ id }).first();
  }

  async find(item: Partial<T>): Promise<T[]> {
    return this.table.where(item);
  }

  async create(item: Omit<T, 'id' | 'createdAt'>): Promise<T> {
    return this.table.insert<T>(item).returning('*').first();
  }

  async update(id: number, item: Partial<T>): Promise<T> {
    return this.table.where({ id }).update(item).returning('*').first();
  }
}
