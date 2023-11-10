import { Controller, Post, Body, Get, Delete, Req } from '@nestjs/common';
import { JobService } from './job.service';
import { CreateJobDto, RepairJobDto } from './job.dto';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('/api/v1/job')
@ApiTags('Job')
export class JobController {
  constructor(private readonly JobService: JobService) {}

  @Get('/')
  @ApiOperation({ summary: 'Lấy danh sách job' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async getJob(@Req() req: Request) {
    return this.JobService.getJob(req);
  }

  @Post('/create')
  @ApiOperation({ summary: 'Tạo Job mới' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {},
  })
  async createJob(@Body() createJobDto: CreateJobDto) {
    return this.JobService.createJob(createJobDto);
  }

  @Post('/repair')
  @ApiOperation({ summary: 'Sửa Job' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async repairJob(@Body() repairJobDto: RepairJobDto) {
    return this.JobService.repairJob(repairJobDto);
  }

  @Delete('/')
  @ApiOperation({ summary: 'Xóa Job' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {},
  })
  async removeJob(@Req() req: Request) {
    return this.JobService.removeJob(req);
  }
}
