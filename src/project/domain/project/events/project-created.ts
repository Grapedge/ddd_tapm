import { IEvent } from '@nestjs/cqrs';

export class ProjectCreated implements IEvent {
  constructor(
    public readonly projectId: string,
    public readonly projectOwnerId: string,
    public readonly name: string,
    public readonly description: string,
    public readonly logoUrl: string,
  ) {}
}
