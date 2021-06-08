import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { ProductOwnerId } from 'src/agile-pm/domain/models/product/product-owner-id';
import { Team } from 'src/agile-pm/domain/models/team/team';
import { TeamMember } from 'src/agile-pm/domain/models/team/team-member';
import { TeamRepository } from 'src/agile-pm/domain/models/team/team-repository';
import { UserId } from 'src/user/domain/models/user-id';
import { TeamDocument, TeamName } from '../schemas/team.schema';

export class MongoTeamRepository implements TeamRepository {
  constructor(
    @InjectModel(TeamName)
    private readonly teamModel: Model<TeamDocument>,
  ) {}

  async findByProduct(productId: ProductId): Promise<Team | undefined> {
    const doc = await this.teamModel.findById(productId);
    if (!doc) return undefined;
    return this.documentToModel(doc);
  }

  async save(team: Team): Promise<void> {
    const doc = this.modelToDocument(team);
    await doc.updateOne(doc, { upsert: true });
  }

  private modelToDocument(model: Team) {
    return new this.teamModel({
      _id: model.productId.id,
      creatorId: model.productOwnerId.id,
      teamMembers: model.teamMembers.map((member) => ({
        _id: member.userId.id,
        role: member.role,
      })),
    });
  }

  private documentToModel(doc: TeamDocument) {
    const productId = new ProductId(doc._id);
    const productOwnerId = new ProductOwnerId(doc.creatorId);
    const teamMembers = doc.teamMembers.map(
      (member) =>
        new TeamMember(productId, new UserId(member._id), member.role),
    );
    return new Team(productId, productOwnerId, teamMembers);
  }
}
