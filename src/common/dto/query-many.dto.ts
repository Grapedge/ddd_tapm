import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class QueryManyDto {
  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(1)
  @IsInt()
  current: number = 1;

  @ApiPropertyOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  @IsInt()
  pageSize: number = 10;
}

export interface QueryManyRes<T> {
  total: number;
  current: number;
  pageSize: number;
  data: T[];
}
