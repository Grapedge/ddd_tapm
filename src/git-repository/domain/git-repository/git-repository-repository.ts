import { GitRepository } from './git-repository';
import { GitRepositoryId } from './git-repository-id';

export interface GitRepositoryRepository {
  nextId(): GitRepositoryId;
  findById(gitRepoId: GitRepositoryId): Promise<GitRepository | undefined>;
  save(gitRepo: GitRepository): Promise<void>;
  remove(gitRepo: GitRepository): Promise<void>;
}
