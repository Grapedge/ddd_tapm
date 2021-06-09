import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt } from 'class-validator';

export class QueryManyDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  current: number = 1;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsInt()
  pageSize: number = 10;
}

export interface QueryManyRes<T> {
  total: number;
  current: number;
  pageSize: number;
  data: T[];
}
