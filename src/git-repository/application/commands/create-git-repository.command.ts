import { ICommand } from '@nestjs/cqrs';

export class CreateGitRepositoryCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly contributorId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly gitUrl: string,
    public readonly homePageUrl: string,
  ) {}
}
