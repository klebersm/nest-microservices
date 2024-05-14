import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { KnexModule } from 'nestjs-knex';

import { mysqlConfig } from '@app/common/config/mysql.config';
import { jwtConfig } from '@app/common/config/jwt.config';

import { AuthController } from './controllers';
import { AuthService } from './services';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot(mysqlConfig()),
    JwtModule.register(jwtConfig()),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
