import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class CodeRepoDocument extends Document {
  @Prop()
  _id: string;

  @Prop({
    index: true,
  })
  productId: string;

  @Prop()
  homePageUrl: string;

  @Prop()
  gitUrl: string;
}

export const CodeRepoSchema = SchemaFactory.createForClass(CodeRepoDocument);

export const CodeRepoName = 'CodeRepo';
