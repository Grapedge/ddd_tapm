import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ContributorRole } from 'src/project/domain/contributor/contributor-role';
import { Project } from 'src/project/domain/project/project';
import { ProjectDocument } from './project.schema';

@Schema({
  timestamps: true,
})
export class ContributorDocument extends Document {
  @Prop({
    index: true,
  })
  contributorId: string;

  @Prop({
    index: true,
  })
  projectId: string;

  @Prop({
    type: Number,
    enum: ContributorRole,
  })
  role: ContributorRole;

  project?: ProjectDocument;
}

export const ContributorSchema =
  SchemaFactory.createForClass(ContributorDocument);

ContributorSchema.index(
  {
    contributorId: 1,
    projectId: 1,
  },
  {
    unique: true,
  },
);

ContributorSchema.virtual('project', {
  ref: Project.name,
  localField: 'projectId',
  foreignField: '_id',
  justOne: true,
});
