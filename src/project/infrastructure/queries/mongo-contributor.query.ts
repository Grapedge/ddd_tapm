import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CtbRole } from 'src/common/decorators/ctb-roles.decorator';
import { ContributorQuery } from 'src/project/application/queries/contributor.query';
import { Contributor } from 'src/project/domain/contributor/contributor';
import { ContributorDocument } from '../schemas/contributor.schema';

export class MongoContributorQuery implements ContributorQuery {
  constructor(
    @InjectModel(Contributor.name)
    private readonly ctbModel: Model<ContributorDocument>,
  ) {}

  async findContributorRole(
    projectId: string,
    contributorId: string,
  ): Promise<CtbRole | undefined> {
    const doc = await this.ctbModel.findOne({
      projectId,
      contributorId,
    });
    if (!doc) {
      return undefined;
    }
    return doc.role;
  }
}
