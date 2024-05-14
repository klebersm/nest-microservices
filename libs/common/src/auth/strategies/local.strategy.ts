import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { protoResolver } from '@app/common/protos/proto.resolver';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class LocalStrategy
  extends PassportStrategy(Strategy)
  implements OnModuleInit
{
  constructor() {
    super();
  }

  private authService;
  onModuleInit() {
    this.authService = this.clientGrpc.getService('AuthService');
  }

  @Client({
    transport: Transport.GRPC,
    options: {
      package: 'auth',
      protoPath: protoResolver,
      url: '127.0.0.1:3201',
      loader: {
        keepCase: true,
      },
    },
  })
  clientGrpc: ClientGrpc;

  async validate(username: string, password: string) {
    try {
      const login = await lastValueFrom(
        this.authService.Login({
          login: username,
          password,
        }),
      );
      return login;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException('Login ou senha inválidos');
    }
  }
}
