import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { Contributor } from 'src/project/domain/contributor/contributor';
import { ContributorId } from 'src/project/domain/contributor/contributor-id';
import { ContributorRepository } from 'src/project/domain/contributor/contributor-repository';
import { ProjectId } from 'src/project/domain/project/project-id';
import { ContributorDocument } from '../schemas/contributor.schema';

export class MongoContributorRepository implements ContributorRepository {
  constructor(
    @InjectModel(Contributor.name)
    private readonly contributorModel: Model<ContributorDocument>,
  ) {}

  nextId(): ProjectId {
    return new ProjectId();
  }

  async findByfProject(
    projectId: ProjectId,
    ctbId: ContributorId,
  ): Promise<Contributor | undefined> {
    const doc = await this.contributorModel.findOne({
      contributorId: ctbId.id,
      projectId: projectId.id,
    });
    if (!doc) {
      return undefined;
    }
    return this.documentToModel(doc);
  }

  async save(contributor: Contributor): Promise<void> {
    const doc = this.modelToDocument(contributor);
    await doc.updateOne(doc, {
      upsert: true,
    });
  }

  async remove(contributor: Contributor): Promise<void> {
    const doc = this.modelToDocument(contributor);
    await doc.deleteOne();
  }

  private modelToDocument(model: Contributor) {
    const doc: LeanDocument<ContributorDocument> = {
      contributorId: model.contributorId.id,
      projectId: model.projectId.id,
      role: model.role,
    };
    return new this.contributorModel(doc);
  }

  private documentToModel(doc: ContributorDocument) {
    const projectId = new ProjectId(doc.projectId);
    const ctbId = new ContributorId(doc.contributorId);
    return new Contributor(projectId, ctbId, doc.role);
  }
}
