import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { PrismaService } from 'services/prisma.service';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  //CREATE NEW Job
  async create(createRoleDto: CreateRoleDto) {
    try {
      const result = await this.prisma.role.create({
        data: createRoleDto,
      });

      return {
        message: 'Tạo ROLE thành công',
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
