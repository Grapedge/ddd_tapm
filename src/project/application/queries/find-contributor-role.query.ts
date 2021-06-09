import { IQuery } from '@nestjs/cqrs';

export class FindContributorRoleQuery implements IQuery {
  constructor(
    public readonly projectId: string,
    public readonly contributorId: string,
  ) {}
}
