import { IEvent } from '@nestjs/cqrs';

export class GitRepositoryCreated implements IEvent {
  constructor(
    public readonly projectId: string,
    public readonly gitRepoId: string,
  ) {}
}
