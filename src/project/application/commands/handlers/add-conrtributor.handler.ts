import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { Contributor } from 'src/project/domain/contributor/contributor';
import { ContributorId } from 'src/project/domain/contributor/contributor-id';
import { ContributorRepository } from 'src/project/domain/contributor/contributor-repository';
import { ProjectId } from 'src/project/domain/project/project-id';
import { ContributorRepositoryImplement } from '../../decorators/contributor-repository.decorator';
import { AddControbutorCommand } from '../add-contributor.command';

@CommandHandler(AddControbutorCommand)
export class AddContributorHandler
  implements ICommandHandler<AddControbutorCommand>
{
  private logger = new Logger('添加项目贡献者');

  constructor(
    @ContributorRepositoryImplement()
    private readonly repository: ContributorRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: AddControbutorCommand): Promise<void> {
    this.logger.log(JSON.stringify(command));
    const projectId = new ProjectId(command.projectId);
    const contributorId = new ContributorId(command.userId);

    const contributor = this.publisher.mergeObjectContext(
      new Contributor(projectId, contributorId, command.contributorRole),
    );

    contributor.add();
    await this.repository.save(contributor);
    contributor.commit();
  }
}
