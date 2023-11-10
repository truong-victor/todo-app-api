import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from './user.dto';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'services/prisma.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  //CREATE NEW USER
  async createUser(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;

    try {
      const findExisted = await this.prisma.user.findFirst({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (findExisted !== null) {
        throw new HttpException(
          'Email đã được sử dụng',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      const result = await this.prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: encryptedPassword,
        },
      });

      return {
        message: 'Đăng ký tài khoản mới thành công',
        success: true,
        data: result,
      };
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //CREATE NEW USER DONE

  //USER LOGIN

  private signToken(payload: any): string {
    return this.jwtService.sign(payload);
  }

  async loginUser(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email.toLowerCase(),
        },
      });
      if (!user) {
        throw new HttpException(
          'Tài khoản hoặc mật khẩu không chính xác',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        throw new HttpException(
          'Tài khoản hoặc mật khẩu không chính xác',
          HttpStatus.UNPROCESSABLE_ENTITY,
        );
      }

      const accessToken = this.signToken({
        email: email.toLowerCase(),
        id: user.id,
      });

      return {
        message: 'Login thành công',
        success: true,
        data: { accessToken },
      };
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //USER LOGIN DONE

  //USER GET PROFILE
  async getProfileUser(req: Request) {
    const user = req['user'] as User;

    try {
      const result = await this.prisma.user.findUnique({
        where: { id: user.id },
      });
      return {
        message: 'Thành công',
        success: true,
        data: result,
      };
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
