import { ICommand } from '@nestjs/cqrs';

export class RenameProductCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
    public readonly name: string,
  ) {}
}
