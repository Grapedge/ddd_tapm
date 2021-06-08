import { IEvent } from '@nestjs/cqrs';

export class ProductCreatedEvent implements IEvent {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly createdAt: Date,
  ) {}
}
