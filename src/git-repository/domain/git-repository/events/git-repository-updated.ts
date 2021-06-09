import { IEvent } from '@nestjs/cqrs';

export class GitRepositoryUpdated implements IEvent {
  constructor(
    public readonly projectId: string,
    private readonly gitRepoId: string,
  ) {}
}
