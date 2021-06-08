import { ICommand } from '@nestjs/cqrs';

export class AddTeamMembersCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
    public readonly teamMemberIds: string[],
  ) {}
}
