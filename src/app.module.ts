import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PrismaService } from 'services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from 'middleware/jwt.middleware';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: '72h' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtMiddleware).forRoutes('/api/v1/user/me', '/api/v1/job/*');
  }
}
