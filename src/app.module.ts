import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { AppController } from './app.controller';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

import { PrismaService } from 'services/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtMiddleware } from 'middleware/jwt.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file/file.controller';
import { FileService } from './file/file.service';
import { ProductController } from './product/product.controller';
import { ProductService } from './product/product.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.TOKEN_KEY,
      signOptions: { expiresIn: '72h' },
    }),
    MulterModule.register({
      dest: './files',
    }),
  ],
  controllers: [
    AppController,
    UserController,
    // JobController,
    // RoleController,
    FileController,
    ProductController,
  ],
  providers: [
    AppService,
    UserService,
    PrismaService,
    // JobService,
    // RoleService,
    FileService,
    ProductService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('/api/v1/user/me', '/api/v1/file', '/api/v1/admin/*');
  }
}
