import { ICommand } from '@nestjs/cqrs';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly projectOwnerId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly logoUrl: string,
  ) {}
}
