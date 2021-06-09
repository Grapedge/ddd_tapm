import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateGitRepositoryDto {
  @ApiProperty({
    example: '我的仓库',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '这是我的仓库描述',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 'git@github.com:Grapedge/ddd_tapm_api.git',
  })
  @IsString()
  gitUrl: string;

  @ApiProperty({
    example: 'https://github.com/Grapedge/ddd_tapm_api',
  })
  @IsString()
  homePageUrl: string;
}
