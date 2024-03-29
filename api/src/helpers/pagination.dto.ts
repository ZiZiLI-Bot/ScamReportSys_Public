import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty({ default: 1, required: false })
  @IsOptional()
  page: number = 1;

  @ApiProperty({ default: 10, required: false })
  @IsOptional()
  limit: number = 10;

  @ApiProperty({ default: 'asc', description: 'asc for ascending, desc for descending', required: false })
  @IsOptional()
  sort: string = 'asc';

  @ApiProperty({ default: '_id', description: 'Field to sort by', required: false })
  @IsOptional()
  sortBy: string = '_id';

  total?: number;

  [key: string]: any;
}
