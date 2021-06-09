import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @ApiProperty({
    example: '长生诀',
  })
  name: string;

  @IsString()
  @ApiProperty({
    example: '项目描述',
  })
  description: string;

  @IsString()
  @ApiProperty({
    example: 'https://p.qqan.com/up/2021-2/16137992359659254.jpg',
  })
  logoUrl: string;
}

export class CreateProjectRes {
  @ApiProperty({
    example: '111112222233333444445',
  })
  projectId: string;
}
