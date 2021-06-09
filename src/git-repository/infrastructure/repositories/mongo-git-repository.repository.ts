import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GitRemote } from 'src/git-repository/domain/git-repository/git-remote';
import { GitRepository } from 'src/git-repository/domain/git-repository/git-repository';
import { GitRepositoryId } from 'src/git-repository/domain/git-repository/git-repository-id';
import { GitRepositoryRepository } from 'src/git-repository/domain/git-repository/git-repository-repository';
import { ContributorId } from 'src/project/domain/contributor/contributor-id';
import { ProjectId } from 'src/project/domain/project/project-id';
import { GitRepositoryDocument } from '../schemas/git-repository.schema';

export class MongoGitRepoRepository implements GitRepositoryRepository {
  constructor(
    @InjectModel(GitRepository.name)
    private readonly gitRepoModel: Model<GitRepositoryDocument>,
  ) {}

  nextId(): GitRepositoryId {
    return new GitRepositoryId();
  }

  async findById(
    gitRepoId: GitRepositoryId,
  ): Promise<GitRepository | undefined> {
    const doc = await this.gitRepoModel.findById(gitRepoId.id);
    if (!doc) {
      return undefined;
    }
    return this.documentToModel(doc);
  }

  async save(gitRepo: GitRepository): Promise<void> {
    const doc = this.modelToDocument(gitRepo);
    await doc.updateOne(doc, {
      upsert: true,
    });
    return;
  }

  async remove(gitRepo: GitRepository): Promise<void> {
    const doc = this.modelToDocument(gitRepo);
    await doc.deleteOne();
  }

  private modelToDocument(model: GitRepository) {
    return new this.gitRepoModel({
      _id: model.gitRepoId.id,
      projectId: model.projectId.id,
      homePageUrl: model.gitRemote.homePageUrl,
      gitUrl: model.gitRemote.gitUrl,
      name: model.name,
      description: model.description,
      creatorId: model.creatorId,
    });
  }

  private documentToModel(doc: GitRepositoryDocument) {
    const gitRepoId = new GitRepositoryId(doc._id);
    const projectId = new ProjectId(doc.projectId);
    const ctbId = new ContributorId(doc.creatorId);
    return new GitRepository(
      projectId,
      gitRepoId,
      doc.name,
      doc.description,
      new GitRemote(doc.gitUrl, doc.homePageUrl),
      ctbId,
    );
  }
}
