// jwt.middleware.ts
import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['x-access-token'] as string | undefined;

    if (!token) {
      throw new HttpException('Missing accessToken', HttpStatus.UNAUTHORIZED);
    }
    try {
      const decoded = this.jwtService.verify(token);
      req['user'] = decoded;
      next();
    } catch (error) {
      throw new HttpException('Unauthorization', HttpStatus.FORBIDDEN);
    }
  }
}
