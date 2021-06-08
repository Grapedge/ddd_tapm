import { ICommand } from '@nestjs/cqrs';

export class CreateCodeRepoCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly teamMemberId: string,
    public readonly gitUrl: string,
    public readonly homePageUrl: string,
  ) {}
}
