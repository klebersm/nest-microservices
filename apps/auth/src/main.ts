import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import { AUTH_PORT } from '@app/common/constants';
import { protoResolver } from '@app/common/protos/proto.resolver';

const port = parseInt(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: protoResolver,
        url: `127.0.0.1:${port + AUTH_PORT}`,
        loader: {
          keepCase: true,
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
