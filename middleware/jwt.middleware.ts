// jwt.middleware.ts
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] as string | undefined;

    if (token) {
      try {
        const decoded = this.jwtService.verify(token);

        req['user'] = decoded;
      } catch (error) {
        // Handle invalid token
        throw new UnauthorizedException('Invalid token');
      }
    }

    next();
  }
}
