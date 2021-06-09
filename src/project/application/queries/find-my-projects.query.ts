import { IQuery } from '@nestjs/cqrs';

export class FindMyProjectsQuery implements IQuery {
  constructor(
    public readonly userId: string,
    public readonly current: number,
    public readonly pageSize: number,
  ) {}
}
