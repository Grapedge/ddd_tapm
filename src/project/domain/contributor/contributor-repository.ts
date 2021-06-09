import { ProjectId } from '../project/project-id';
import { Contributor } from './contributor';
import { ContributorId } from './contributor-id';

export interface ContributorRepository {
  findByfProject(
    projectId: ProjectId,
    ctbId: ContributorId,
  ): Promise<Contributor | undefined>;

  save(cont: Contributor): Promise<void>;

  remove(cont: Contributor): Promise<void>;
}
