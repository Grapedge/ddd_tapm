import { Logger } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ProjectQueryImplement } from '../../decorators/project-query.decorator';
import { FindMyProjectsQuery } from '../find-my-projects.query';
import { ProjectQuery } from '../project-query';

@QueryHandler(FindMyProjectsQuery)
export class FindMyProjectsHandler
  implements IQueryHandler<FindMyProjectsQuery>
{
  constructor(
    @ProjectQueryImplement()
    private readonly projectQuery: ProjectQuery,
  ) {}

  async execute(query: FindMyProjectsQuery): Promise<any> {
    const data = await this.projectQuery.findMine(
      query.userId,
      query.current,
      query.pageSize,
    );
    return data;
  }
}
