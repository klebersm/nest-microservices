import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, Payload } from '@nestjs/microservices';
import { AuthService } from '../services';

import { User, LoggedUser } from '@app/common/types';
import { JwtGuard } from '@app/common/auth/guards';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService')
  async Login(
    @Payload() { login, password }: Pick<User, 'login' | 'password'>,
  ): Promise<LoggedUser> {
    const auth = await this.authService.validateUser(login, password);
    return auth;
  }

  @GrpcMethod('AuthService')
  @UseGuards(JwtGuard)
  async CreateUser(@Payload() payload) {
    console.log(payload);
    return {
      id: 1,
      ...payload,
    };
  }
}
