import { CodeRepo } from './code-repo';
import { CodeRepoId } from './code-repo-id';

export interface CodeRepoRepository {
  nextId(): CodeRepoId;
  findById(codeRepoId: CodeRepoId): Promise<CodeRepo | undefined>;
  save(codeRepo: CodeRepo): Promise<void>;
}
