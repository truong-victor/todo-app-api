import { ApiProperty } from '@nestjs/swagger';
import { JobStatus } from '@prisma/client';

export class CreateJobDto {
  @ApiProperty()
  readonly note?: string;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly userId: number;
}

export class RepairJobDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name?: string;

  @ApiProperty()
  readonly note?: string;

  @ApiProperty()
  readonly status?: JobStatus;

  @ApiProperty()
  readonly userId?: number;
}
