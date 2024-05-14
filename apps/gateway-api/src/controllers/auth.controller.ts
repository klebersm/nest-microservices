import { lastValueFrom } from 'rxjs';
import { Metadata } from '@grpc/grpc-js';
import {
  Controller,
  Post,
  Req,
  Res,
  Body,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';

import { protoResolver } from '@app/common/protos/proto.resolver';
import { GrpcMetadata } from '@app/common/auth/decorators';

@Controller('auth')
export class AuthController implements OnModuleInit {
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

  constructor() {}

  private authService;
  onModuleInit() {
    this.authService = this.clientGrpc.getService('AuthService');
  }

  @Post('signin')
  @UseGuards(AuthGuard('local'))
  async signin(@Req() req, @Res() res, @Body() body) {
    res.json(req.user);
  }

  @Post('create-user')
  async createUser(@GrpcMetadata() metadata: Metadata) {
    // const metadata = new Metadata();
    // metadata.set('authorization', 'Bearer token');

    // console.log(metadata);
    // console.log(metadt);

    const payload = {};
    const user = await lastValueFrom(
      this.authService.CreateUser(
        {
          name: 'name',
          login: 'login',
          email: 'email',
          password: 'pass',
        },
        metadata,
      ),
    );
    console.log(user);

    // return user;
    return 'test';
  }
}
