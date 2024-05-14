import { Knex } from 'knex';

import { KnexRepository } from './knex.repository';
import { User } from '../types';

export class UserRepository extends KnexRepository<User> {
  constructor(knex: Knex) {
    super(knex, 'User');
  }

  findByLogin(login: string): Promise<User> {
    return this.table.where({ login }).first();
  }
}
