import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Metadata } from '@grpc/grpc-js';

export const GrpcMetadata = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Metadata => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization;

    const metadata = new Metadata();
    metadata.set('authorization', token);

    return metadata;
  },
);
