import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './product.dto';
import { Request } from 'express';
import { PrismaService } from 'services/prisma.service';
@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}
  //GET Job
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
  //GET Job DONE

  //CREATE NEW Job
  async create(createProductDto: CreateProductDto) {
    const { listImage, ...data } = createProductDto;
    try {
      const result = await this.prisma.product.create({
        data: {
          listImage: JSON.stringify(listImage),
          ...data,
        },
      });

      return {
        message: 'Tạo sản phẩm thành công',
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
  async edit(updateProductDto: UpdateProductDto) {
    const { id, listImage, ...data } = updateProductDto;
    try {
      const result = await this.prisma.product.update({
        where: {
          id,
        },
        data: {
          listImage: JSON.stringify(listImage),
          ...data,
        },
      });

      return {
        message: 'Sửa sản phẩm thành công',
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
    const { id } = req.params;

    try {
      const result = await this.prisma.product.delete({
        where: { id: Number(id) },
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
