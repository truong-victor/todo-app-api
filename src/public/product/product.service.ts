import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
@Injectable()
export class PublicProductService {
  constructor(private readonly prisma: PrismaService) {}
  async search(req: Request) {
    const { name, page = 1, pageSize = 10 } = req.query;
    const lowercaseName = name ? name.toString().toLowerCase() : '';
    try {
      const result = await this.prisma.product.findMany({
        where: {
          name: {
            contains: lowercaseName,
            mode: 'insensitive',
          },
        },
        skip: (Number(page) - 1) * Number(pageSize),
        take: Number(pageSize),
      });

      const totalCount = await this.prisma.product.count({
        where: {
          name: {
            contains: lowercaseName,
            mode: 'insensitive',
          },
        },
      });
      return {
        message: `ok`,
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

  async detail(req: Request) {
    const { id } = req.params;

    try {
      const result = await this.prisma.product.findUnique({
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
