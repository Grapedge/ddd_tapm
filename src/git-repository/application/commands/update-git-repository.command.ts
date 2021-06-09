import { ICommand } from '@nestjs/cqrs';

export class UpdateGitRemoteCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly gitRepoId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly gitUrl: string,
    public readonly homePageUrl: string,
  ) {}
}
