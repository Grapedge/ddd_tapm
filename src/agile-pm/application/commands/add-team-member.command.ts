import { ICommand } from '@nestjs/cqrs';

export class AddTeamMemberCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
    public readonly teamMemberId: string,
  ) {}
}
