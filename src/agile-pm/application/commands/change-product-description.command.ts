import { ICommand } from '@nestjs/cqrs';

export class ChangeProductDescriptionCommand implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
    public readonly description: string,
  ) {}
}
