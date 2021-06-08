import { IEvent } from '@nestjs/cqrs';

export class TeamCreatedEvent implements IEvent {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
  ) {}
}
