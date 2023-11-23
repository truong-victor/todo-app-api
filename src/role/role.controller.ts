import { Controller, Post, Body } from '@nestjs/common';

import { CreateRoleDto } from './role.dto';
import { RoleService } from './role.service';

@Controller('/api/v1/role')
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.service.create(createRoleDto);
  }
}
