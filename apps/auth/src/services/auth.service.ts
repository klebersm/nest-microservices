import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { InjectKnex, Knex } from 'nestjs-knex';

import { LoggedUser } from '@app/common/types';
import { UserRepository } from '@app/common/repositories';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private userRepository: UserRepository;
  constructor(
    @InjectKnex() private readonly knex: Knex,
    private jwtService: JwtService,
  ) {
    this.userRepository = new UserRepository(this.knex);
  }

  async validateUser(login: string, password: string): Promise<LoggedUser> {
    const user = await this.userRepository.findByLogin(login);

    if (!user) return null;
    if (!user.active) return null;

    if (await bcrypt.compare(password, user.password)) {
      const { id, name, login, email } = user;

      const token = await this.jwtService.sign({
        id,
        name,
        login,
        email,
      });

      return {
        user: {
          id,
          name,
          login,
          email,
        },
        token,
      };
    }

    return null;
  }
}
