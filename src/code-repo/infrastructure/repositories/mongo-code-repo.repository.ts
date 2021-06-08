import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { CodeRepo } from 'src/code-repo/domain/models/code-repo';
import { CodeRepoId } from 'src/code-repo/domain/models/code-repo-id';
import { CodeRepoRepository } from 'src/code-repo/domain/models/code-repo-repository';
import { CodeRepoDocument, CodeRepoName } from '../schemas/code-repo.schema';

export class MongoCodeRepoRepository implements CodeRepoRepository {
  constructor(
    @InjectModel(CodeRepoName)
    private readonly codeRepoModel: Model<CodeRepoDocument>,
  ) {}

  nextId(): CodeRepoId {
    return new CodeRepoId(nanoid());
  }

  async findById(codeRepoId: CodeRepoId): Promise<CodeRepo | undefined> {
    const doc = await this.codeRepoModel.findById(codeRepoId.id);
    if (!doc) {
      return undefined;
    }
    return this.documentToModel(doc);
  }

  async save(codeRepo: CodeRepo): Promise<void> {
    const doc = this.modelToDocument(codeRepo);
    await doc.updateOne(doc, {
      upsert: true,
    });
    return;
  }

  private modelToDocument(model: CodeRepo) {
    return new this.codeRepoModel({
      _id: model.codeRepoId.id,
      productId: model.productId.id,
      homePageUrl: model.homePageUrl,
      gitUrl: model.gitUrl,
    });
  }

  private documentToModel(doc: CodeRepoDocument) {
    const codeRepoId = new CodeRepoId(doc._id);
    const productId = new ProductId(doc.productId);
    return new CodeRepo(codeRepoId, productId, doc.homePageUrl, doc.gitUrl);
  }
}
