import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CtbRoles } from 'src/common/decorators/ctb-roles.decorator';
import { CurUser } from 'src/common/decorators/cur-user.decorator';
import { CreateGitRepositoryCommand } from 'src/git-repository/application/commands/create-git-repository.command';
import { CreateGitRepositoryDto } from './dto/create-git-repository.dto';

@Controller('project/:projectId/repos')
@ApiTags('Git 仓库')
export class GitRepositoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CtbRoles()
  async createGitRepository(
    @CurUser() ctbId: string,
    @Param('projectId') projectId: string,
    @Body() dto: CreateGitRepositoryDto,
  ) {
    await this.commandBus.execute(
      new CreateGitRepositoryCommand(
        projectId,
        ctbId,
        dto.name,
        dto.description,
        dto.gitUrl,
        dto.homePageUrl,
      ),
    );
  }
}
