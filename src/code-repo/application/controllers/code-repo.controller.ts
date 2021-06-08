import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { CurUser } from 'src/common/decorators/cur-user.decorator';
import { CreateCodeRepoCommand } from '../commands/create-code-repo.command';
import {
  CreateCodeRepoDto,
  CreateCodeRepoRes,
} from './dto/create-code-repo.dto';

@Controller('code-repo')
@ApiTags('代码仓库')
export class CodeRepoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  async createCodeRepo(
    @CurUser() userId: string,
    @Body() dto: CreateCodeRepoDto,
  ): Promise<CreateCodeRepoRes> {
    const command = new CreateCodeRepoCommand(
      dto.productId,
      userId,
      dto.gitUrl,
      dto.homePageUrl,
    );
    const codeRepoId = await this.commandBus.execute(command);
    return {
      codeRepoId,
    };
  }
}
