import { ApiProperty } from '@nestjs/swagger';

export class AddTeamMembersDto {
  @ApiProperty()
  teamMemberIds: string[];
}
