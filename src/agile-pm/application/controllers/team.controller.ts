import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CurUser } from 'src/common/decorators/cur-user.decorator';
import { AddTeamMembersCommand } from '../commands/add-team-members.command';
import { AddTeamMembersDto } from './dto/add-team-members.dto';

@Controller('product')
@ApiTags('产品')
export class TeamController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post(':productId/team-members')
  async addMembers(
    @CurUser() userId: string,
    @Param('productId') productId: string,
    @Body() dto: AddTeamMembersDto,
  ) {
    await this.commandBus.execute(
      new AddTeamMembersCommand(productId, userId, dto.teamMemberIds),
    );
    return {};
  }
}
