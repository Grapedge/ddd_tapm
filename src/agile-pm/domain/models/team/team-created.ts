export class TeamCreatedEvent {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
  ) {}
}
