import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectData {
  @ApiProperty({
    example: 'aaaabbbbccccddddeeeef',
  })
  id: string;

  @ApiProperty({
    example: '201800301111',
  })
  projectOwnerId: string;

  @ApiProperty({
    example: '长生诀',
  })
  name: string;

  @ApiProperty({
    example: '根据歌曲改编的游戏',
  })
  description: string;

  @ApiProperty({
    example:
      'https://img0.baidu.com/it/u=140468822,3691050151&fm=26&fmt=auto&gp=0.jpg',
  })
  logoUrl: string;

  @ApiProperty()
  createdAt: Date;

  @ApiPropertyOptional()
  archivedAt: Date;
}
