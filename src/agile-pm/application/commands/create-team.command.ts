import { ICommand } from '@nestjs/cqrs';

export class CreateTeamCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
  ) {}
}
