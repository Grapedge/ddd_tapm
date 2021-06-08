import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { TeamMemberRole } from 'src/agile-pm/domain/models/team/team-member-role';

@Schema({ timestamps: true })
export class TeamMemberDocument extends Document {
  @Prop({
    index: true,
  })
  _id: string; // 用户 id

  @Prop({
    enum: TeamMemberRole,
    default: TeamMemberRole.Visitor,
  })
  role: TeamMemberRole; // 用户权限
}

const TeamMemberSchema = SchemaFactory.createForClass(TeamMemberDocument);

@Schema({ timestamps: true })
export class TeamDocument extends Document {
  @Prop()
  _id: string; // 产品 id

  @Prop()
  creatorId: string; // 拥有者id

  @Prop({
    type: [TeamMemberSchema],
  })
  // TODO: 创建视图，用以快速查询
  teamMembers: TeamMemberDocument[];
}

export const TeamSchema = SchemaFactory.createForClass(TeamDocument);

export const TeamName = 'Team';
