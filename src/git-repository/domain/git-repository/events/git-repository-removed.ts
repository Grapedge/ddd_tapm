import { IEvent } from '@nestjs/cqrs';

export class GitRepositoryRemoved implements IEvent {
  constructor(
    public readonly projectId: string,
    public readonly gitRepoId: string,
  ) {}
}
