import { ICommand } from '@nestjs/cqrs';

export class RemoveTeamMemberCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
    public readonly teamMemberId: string,
  ) {}
}
