import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { GitRemote } from 'src/git-repository/domain/git-repository/git-remote';
import { GitRepository } from 'src/git-repository/domain/git-repository/git-repository';
import { GitRepositoryRepository } from 'src/git-repository/domain/git-repository/git-repository-repository';
import { ContributorId } from 'src/project/domain/contributor/contributor-id';
import { ProjectId } from 'src/project/domain/project/project-id';
import { GitRepositoryRepositoryImplement } from '../../decorators/git-repository-repository.decorator';
import { CreateGitRepositoryCommand } from '../create-git-repository.command';

@CommandHandler(CreateGitRepositoryCommand)
export class CreateGitRepositoryHandler
  implements ICommandHandler<CreateGitRepositoryCommand>
{
  private readonly logger = new Logger('创建Git仓库');

  constructor(
    @GitRepositoryRepositoryImplement()
    private readonly repository: GitRepositoryRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateGitRepositoryCommand): Promise<string> {
    this.logger.log(JSON.stringify(command));

    const projectId = new ProjectId(command.projectId);
    const gitRepoId = this.repository.nextId();
    const gitRemote = new GitRemote(command.gitUrl, command.homePageUrl);
    const contributorId = new ContributorId(command.contributorId);
    const gitRepo = this.publisher.mergeObjectContext(
      new GitRepository(
        projectId,
        gitRepoId,
        command.name,
        command.description,
        gitRemote,
        contributorId,
      ),
    );
    gitRepo.create();
    await this.repository.save(gitRepo);
    gitRepo.commit();
    return gitRepoId.id;
  }
}
