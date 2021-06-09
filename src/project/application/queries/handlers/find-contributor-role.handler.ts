import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ContributorRole } from 'src/project/domain/contributor/contributor-role';
import { ContributorQueryImplement } from '../../decorators/contributor-query.decorator';
import { ContributorQuery } from '../contributor.query';
import { FindContributorRoleQuery } from '../find-contributor-role.query';

@QueryHandler(FindContributorRoleQuery)
export class FindContributorRoleHandler
  implements IQueryHandler<FindContributorRoleQuery>
{
  constructor(
    @ContributorQueryImplement()
    private readonly ctbQuery: ContributorQuery,
  ) {}

  async execute(query: FindContributorRoleQuery): Promise<ContributorRole> {
    return this.ctbQuery.findContributorRole(
      query.projectId,
      query.contributorId,
    );
  }
}
