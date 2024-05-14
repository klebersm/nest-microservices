import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import { jwtConfig } from './jwt.config';
import main from './main.config';
import { mysqlConfig } from './mysql.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [jwtConfig, main, mysqlConfig],
    }),
  ],
})
export class ConfigModule {}
