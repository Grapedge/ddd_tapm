import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Project } from 'src/project/domain/project/project';
import { ProjectOwnerId } from 'src/project/domain/project/project-owner-id';
import { ProjectRepository } from 'src/project/domain/project/project-repository';
import { ProjectRepositoryImplement } from '../../decorators/project-repository.decorator';
import { CreateProjectCommand } from '../create-project.command';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  private logger = new Logger('创建项目');

  constructor(
    @ProjectRepositoryImplement()
    private readonly repository: ProjectRepository,
    private readonly publisher: EventPublisher,
  ) {}

  /**
   * 创建项目
   * @returns 返回项目 ID
   */
  async execute(command: CreateProjectCommand): Promise<string> {
    this.logger.log(JSON.stringify(command));
    const projectId = this.repository.nextId();
    const projectOwnerId = new ProjectOwnerId(command.projectOwnerId);

    const project = this.publisher.mergeObjectContext(
      new Project(
        projectId,
        projectOwnerId,
        command.name,
        command.description,
        command.logoUrl,
        new Date(),
        undefined,
      ),
    );

    project.create();
    await this.repository.save(project);
    project.commit();
    return projectId.id;
  }
}
