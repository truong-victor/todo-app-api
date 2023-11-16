import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateJobDto } from './job.dto';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'services/prisma.service';
import { Job } from '@prisma/client';
@Injectable()
export class JobService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  //GET Job
  async getList(req: Request) {
    const { name, page = 1, pageSize = 10 } = req.query;
    const lowercaseName = name ? name.toString().toLowerCase() : '';
    try {
      const result = await this.prisma.job.findMany({
        where: {
          name: {
            contains: lowercaseName,
            mode: 'insensitive',
          },
          deleted: false,
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      });

      const totalCount = await this.prisma.job.count({
        where: {
          name: {
            contains: lowercaseName,
            mode: 'insensitive',
          },
          deleted: false,
        },
      });
      return {
        message: `Danh sách job có ký tự ${name}`,
        success: true,
        data: {
          dataTable: result,
          paging: {
            page: Number(page),
            pageSize: Number(pageSize),
          },
          totalCount,
        },
      };
    } catch (error: any) {
      throw new HttpException(
        error?.message ?? 'Internal Server',
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  //GET Job DONE

  //CREATE NEW Job
  async create(createJobDto: CreateJobDto) {
    const { note, name, userId } = createJobDto;

    try {
      const result = await this.prisma.job.create({
        data: {
          name,
          userId,
          note,
        },
      });

      return {
        message: 'Tạo Job thành công',
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
  //CREATE NEW Job DONE

  //REPAIR Job
  async edit(repairJobDto: Partial<Job>) {
    const { id, ...data } = repairJobDto;
    try {
      const result = await this.prisma.job.update({
        where: {
          id,
        },
        data,
      });

      return {
        message: 'Sửa Job thành công',
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
  //REPAIR Job DONE

  //REMOVE Job
  async delete(req: Request) {
    const { id } = req.query;

    try {
      const result = await this.prisma.job.update({
        where: { id: Number(id) },
        data: {
          deleted: true,
        },
      });

      return {
        message: 'Xóa thành công',
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
  //REMOVE Job DONE

  //GET DETAIL
  async detail(req: Request) {
    const { id } = req.params;

    try {
      const result = await this.prisma.job.findUnique({
        where: { id: Number(id) },
      });

      return {
        message: 'thành công',
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
  //GET DETAIL DONE
}
