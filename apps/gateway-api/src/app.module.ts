import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

import { LocalStrategy } from '@app/common/auth/strategies';

import { AuthController } from './controllers';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AuthController],
  providers: [AppService, LocalStrategy],
})
export class AppModule {}
