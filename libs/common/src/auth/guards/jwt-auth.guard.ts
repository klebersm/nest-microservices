import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private readonly jwtService: JwtService) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const rpc = context.switchToRpc();
    const metadata = rpc.getContext();
    const authorization = metadata.get('authorization');

    if (!authorization || !authorization.length) return false;

    const [bearer, token] = authorization[0].split(' ');
    if (bearer !== 'Bearer') return false;

    // At invalid token, throw a exception
    this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    return true;
  }
}
