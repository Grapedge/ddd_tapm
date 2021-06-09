import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QueryManyRes } from 'src/common/dto/query-many.dto';
import { ProjectData } from 'src/project/application/queries/project-data';
import { ProjectQuery } from 'src/project/application/queries/project-query';
import { Contributor } from 'src/project/domain/contributor/contributor';
import { Project } from 'src/project/domain/project/project';
import { ContributorDocument } from '../schemas/contributor.schema';
import { ProjectDocument } from '../schemas/project.schema';

export class MongoProjectQuery implements ProjectQuery {
  constructor(
    @InjectModel(Project.name)
    public readonly projectModel: Model<ProjectDocument>,
    @InjectModel(Contributor.name)
    public readonly contributorModel: Model<ContributorDocument>,
  ) {}

  async findById(projectId: string): Promise<ProjectData | undefined> {
    const doc = await this.projectModel.findById(projectId);
    if (!doc) {
      return undefined;
    }
    return this.documentToData(doc);
  }

  async findMine(
    userId: string,
    current = 1,
    pageSize = 10,
  ): Promise<QueryManyRes<ProjectData>> {
    const [total, ctbDocs] = await Promise.all([
      this.contributorModel.countDocuments({
        contributorId: userId,
      }),
      this.contributorModel
        .find({
          contributorId: userId,
        })
        .limit(pageSize)
        .skip((current - 1) * pageSize)
        .sort({
          updatedAt: 'desc',
        })
        .populate('project'),
    ]);

    // 拿到项目数据
    const data = ctbDocs
      .map(({ project }) => project)
      .filter(Boolean)
      .map(this.documentToData);

    return {
      current,
      pageSize,
      total,
      data,
    };
  }

  private documentToData(doc: ProjectDocument): ProjectData {
    return {
      id: doc._id,
      projectOwnerId: doc.projectOwnerId,
      name: doc.name,
      description: doc.description,
      logoUrl: doc.logoUrl,
      createdAt: doc.createdAt,
      archivedAt: doc.archivedAt,
    };
  }
}
