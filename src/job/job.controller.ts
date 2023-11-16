import { Controller, Post, Body, Get, Delete, Req, Put } from '@nestjs/common';
import { CreateJobDto } from './job.dto';
import { Request } from 'express';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JobService } from './job.service';
import { Job } from '@prisma/client';

@Controller('/api/v1/job')
@ApiTags('Job')
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách job' })
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
    description: 'Tên công việc',
    required: false,
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async getJob(@Req() req: Request) {
    return this.jobService.getList(req);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo Job mới' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {},
  })
  async createJob(@Body() createJobDto: CreateJobDto) {
    return this.jobService.create(createJobDto);
  }

  @Put()
  @ApiOperation({ summary: 'Sửa Job' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async repairJob(@Body() repairJobDto: Partial<Job>) {
    return this.jobService.edit(repairJobDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin chi tiết 1 Job' })
  @ApiParam({
    name: 'id',
    description: 'Id của job',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async getDetail(@Req() req: Request) {
    return this.jobService.detail(req);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa Job' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async removeJob(@Req() req: Request) {
    return this.jobService.delete(req);
  }
}
