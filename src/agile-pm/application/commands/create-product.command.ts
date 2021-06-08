import { ICommand } from '@nestjs/cqrs';

export class CreateProductCommand implements ICommand {
  constructor(
    public readonly productOwnerId: string,
    public readonly name: string,
    public readonly description: string,
  ) {}
}
