import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateCodeRepoDto {
  @IsString()
  @ApiProperty()
  productId: string;

  @IsString()
  @ApiProperty()
  gitUrl: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  homePageUrl = '';
}

export class CreateCodeRepoRes {
  @ApiProperty()
  codeRepoId: string;
}
