import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { CodeRepo } from './code-repo';
import { CodeRepoId } from './code-repo-id';

export interface CodeRepoRepository {
  nextId(): CodeRepoId;
  findById(codeRepoId: CodeRepoId): Promise<CodeRepo | undefined>;
  findByProduct(productId: ProductId): Promise<CodeRepo[]>;
  save(codeRepo: CodeRepo): Promise<void>;
}
