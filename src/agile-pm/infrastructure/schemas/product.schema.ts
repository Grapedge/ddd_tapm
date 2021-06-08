import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class ProductDocument extends Document {
  @Prop()
  _id: string; // 产品 id

  @Prop()
  creatorId: string; // 产品拥有者

  @Prop()
  name: string; // 产品名

  @Prop()
  desc: string; // 产品描述

  @Prop()
  logo: string; // 产品logo

  @Prop()
  createdAt: Date; // 创建时间
}

export const ProductSchema = SchemaFactory.createForClass(ProductDocument);

export const ProductName = 'Product';
