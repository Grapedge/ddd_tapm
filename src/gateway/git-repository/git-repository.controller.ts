import { Body, Controller, Param, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CtbRoles } from 'src/common/decorators/ctb-roles.decorator';
import { CurUser } from 'src/common/decorators/cur-user.decorator';
import { CreateGitRepositoryCommand } from 'src/git-repository/application/commands/create-git-repository.command';
import {
  CreateGitRepositoryDto,
  CreateGitRepositoryRes,
} from './dto/create-git-repository.dto';

@Controller('project/:projectId/repos')
@ApiTags('Git 仓库')
export class GitRepositoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @CtbRoles()
  @ApiOperation({
    description: '创建一个 Git 仓库，可以自由绑定仓库',
  })
  @ApiCreatedResponse({
    description: '返回创建的 Git 仓库 ID',
    type: CreateGitRepositoryRes,
  })
  async createGitRepository(
    @CurUser() ctbId: string,
    @Param('projectId') projectId: string,
    @Body() dto: CreateGitRepositoryDto,
  ) {
    const gitRepoId = await this.commandBus.execute(
      new CreateGitRepositoryCommand(
        projectId,
        ctbId,
        dto.name,
        dto.description,
        dto.gitUrl,
        dto.homePageUrl,
      ),
    );
    return {
      gitRepoId,
    };
  }
}
