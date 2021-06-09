import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class ProjectDocument extends Document {
  @Prop()
  _id: string;

  @Prop()
  projectOwnerId: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  logoUrl: string;

  @Prop()
  createdAt: Date;

  @Prop()
  archivedAt?: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(ProjectDocument);
