import { CtbRole } from 'src/common/decorators/ctb-roles.decorator';

export interface ContributorQuery {
  findContributorRole(
    projectId: string,
    contributorId: string,
  ): Promise<CtbRole | undefined>;
}
