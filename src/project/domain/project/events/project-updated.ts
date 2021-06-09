import { IEvent } from '@nestjs/cqrs';

export class ProjectUpdated implements IEvent {
  constructor(public readonly projectId: string) {}
}
