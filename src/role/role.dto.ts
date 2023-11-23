import { ApiProperty } from '@nestjs/swagger';
// import { JobStatus } from '@prisma/client';

export class CreateRoleDto {
  @ApiProperty()
  readonly tenhienthi: string;

  @ApiProperty()
  readonly tenviettat: string;
}

export class RepairJobDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly note?: string;

  @ApiProperty()
  readonly status?: any;

  @ApiProperty()
  readonly userId?: number;
}
