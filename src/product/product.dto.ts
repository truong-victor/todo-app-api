import { ApiProperty } from '@nestjs/swagger';
// import { JobStatus } from '@prisma/client';

export class CreateProductDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly salePrice: number;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly avatar: string;

  @ApiProperty()
  readonly listImage: string[];

  @ApiProperty()
  readonly description: string;
}

export class UpdateProductDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly salePrice: number;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly avatar: string;

  @ApiProperty()
  readonly listImage: string[];

  @ApiProperty()
  readonly description: string;
}
