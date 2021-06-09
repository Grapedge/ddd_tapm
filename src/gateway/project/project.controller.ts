import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ApiTapmAuth } from 'src/common/decorators/api-tapm-auth.decorator';
import { CurUser } from 'src/common/decorators/cur-user.decorator';
import { QueryManyDto } from 'src/common/dto/query-many.dto';
import { CreateProjectCommand } from 'src/project/application/commands/create-project.command';
import { FindMyProjectsQuery } from 'src/project/application/queries/find-my-projects.query';
import { ProjectData } from 'src/project/application/queries/project-data';
import { CreateProjectDto, CreateProjectRes } from './dto/create-project.dto';

@ApiTags('项目')
@ApiTapmAuth()
@Controller('project')
export class ProjectController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiOperation({
    description: '用户创建项目',
  })
  @ApiCreatedResponse({
    description: '返回创建项目的 ID (21位)',
    type: CreateProjectRes,
  })
  async createProject(
    @CurUser() projectOwnerId: string,
    @Body() dto: CreateProjectDto,
  ) {
    // 创建项目
    const projectId: string = await this.commandBus.execute(
      new CreateProjectCommand(
        projectOwnerId,
        dto.name,
        dto.description,
        dto.logoUrl,
      ),
    );
    return {
      projectId,
    };
  }

  @Get()
  @ApiOperation({
    description: '查找我的项目',
  })
  @ApiOkResponse({
    type: [ProjectData],
  })
  async findMine(
    @CurUser() userId: string,
    @Query() { current, pageSize }: QueryManyDto,
  ) {
    const projects = await this.queryBus.execute(
      new FindMyProjectsQuery(userId, current, pageSize),
    );
    return projects;
  }
}
