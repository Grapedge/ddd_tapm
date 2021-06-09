import { InjectModel } from '@nestjs/mongoose';
import { LeanDocument, Model } from 'mongoose';
import { Project } from 'src/project/domain/project/project';
import { ProjectId } from 'src/project/domain/project/project-id';
import { ProjectOwnerId } from 'src/project/domain/project/project-owner-id';
import { ProjectRepository } from 'src/project/domain/project/project-repository';
import { ProjectDocument } from '../schemas/project.schema';

export class MongoProjectRepository implements ProjectRepository {
  constructor(
    @InjectModel(Project.name)
    private readonly projectModel: Model<ProjectDocument>,
  ) {}

  nextId(): ProjectId {
    return new ProjectId();
  }

  async findById(id: ProjectId): Promise<Project | undefined> {
    const doc = await this.projectModel.findById(id.id);
    if (!doc) {
      return undefined;
    }
    return this.documentToModel(doc);
  }

  async save(project: Project): Promise<void> {
    const doc = this.modelToDocument(project);
    await doc.updateOne(doc, {
      upsert: true,
    });
  }

  private modelToDocument(model: Project) {
    const doc: LeanDocument<ProjectDocument> = {
      _id: model.projectId.id,
      projectOwnerId: model.projectOwnerId.id,
      name: model.name,
      description: model.description,
      logoUrl: model.logoUrl,
      createdAt: model.createdAt,
      archivedAt: model.archivedAt,
    };
    return new this.projectModel(doc);
  }

  private documentToModel(doc: ProjectDocument) {
    const projectId = new ProjectId(doc._id);
    const projectOwnerId = new ProjectOwnerId(doc.projectOwnerId);
    return new Project(
      projectId,
      projectOwnerId,
      doc.name,
      doc.description,
      doc.logoUrl,
      doc.createdAt,
      doc.archivedAt,
    );
  }
}
