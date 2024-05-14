import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    const expires = this.configService.get<string>('JWT_EXPIRES_IN');
    return 'Hello World! ' + expires;
  }
}
