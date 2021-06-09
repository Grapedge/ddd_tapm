import { IEvent } from '@nestjs/cqrs';

export class ProjectArchived implements IEvent {
  constructor(
    public readonly projectId: string,
    public readonly archivedAt: Date,
  ) {}
}
