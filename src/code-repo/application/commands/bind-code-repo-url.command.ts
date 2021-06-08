import { ICommand } from '@nestjs/cqrs';

export class BindCodeRepoUrlCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly teamMemberId: string,
    public readonly codeRepoId: string,
    public readonly gitUrl: string,
    public readonly homePageUrl: string,
  ) {}
}
