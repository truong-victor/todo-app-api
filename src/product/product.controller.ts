import { Controller, Post, Body, Get, Delete, Req, Put } from '@nestjs/common';
import { Request } from 'express';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './product.dto';

@Controller('/api/v1/admin/product')
@ApiTags('Admin / Product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

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

  @Post()
  @ApiOperation({ summary: 'Tạo  mới' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {},
  })
  async createJob(@Body() createProductDto: CreateProductDto) {
    return this.service.create(createProductDto);
  }

  @Put()
  @ApiOperation({ summary: 'Sửa ' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async repairJob(@Body() updateProductDto: UpdateProductDto) {
    return this.service.edit(updateProductDto);
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

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa' })
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
  async removeJob(@Req() req: Request) {
    return this.service.delete(req);
  }
}
