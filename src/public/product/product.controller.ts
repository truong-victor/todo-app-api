import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PublicProductService } from './product.service';

@Controller('/api/v1/public/product')
@ApiTags('Public / Product')
export class PublicProductController {
  constructor(private readonly service: PublicProductService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách sản phẩm' })
  @ApiQuery({
    name: 'page',
    description: 'Trang hiện tại',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'pageSize',
    description: 'Số lượng data / 1 trang',
    required: true,
    type: Number,
  })
  @ApiQuery({
    name: 'name',
    description: 'Tên sản phẩm',
    required: false,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async getJob(@Req() req: Request) {
    return this.service.search(req);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết theo id' })
  @ApiParam({
    name: 'id',
    description: 'Id',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async getDetail(@Req() req: Request) {
    return this.service.detail(req);
  }
}
