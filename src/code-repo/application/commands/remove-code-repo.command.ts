import { ICommand } from '@nestjs/cqrs';

export class RemoveCodeRepoCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly teamMemberId: string,
    public readonly codeRepoId: string,
  ) {}
}
