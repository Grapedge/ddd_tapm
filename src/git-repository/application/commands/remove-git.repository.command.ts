import { ICommand } from '@nestjs/cqrs';

export class RemoveGitRepositoryCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly gitRepoId: string,
  ) {}
}
