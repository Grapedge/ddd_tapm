import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class GitRepositoryDocument extends Document {
  @Prop()
  _id: string;

  @Prop({
    index: true,
  })
  projectId: string;

  @Prop()
  homePageUrl: string;

  @Prop()
  gitUrl: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  creatorId: string;
}

export const GitRepositorySchema = SchemaFactory.createForClass(
  GitRepositoryDocument,
);

GitRepositorySchema.index(
  {
    _id: 1,
    projectId: 1,
  },
  {
    unique: true,
  },
);
