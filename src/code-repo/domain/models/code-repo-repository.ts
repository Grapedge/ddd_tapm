import { CodeRepoId } from './code-repo-id';

export interface CodeRepoRepository {
  nextId(): CodeRepoId;
}
