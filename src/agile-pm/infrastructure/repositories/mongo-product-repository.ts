import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { nanoid } from 'nanoid';
import { Product } from 'src/agile-pm/domain/models/product/product';
import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { ProductOwnerId } from 'src/agile-pm/domain/models/product/product-owner-id';
import { ProductRepository } from 'src/agile-pm/domain/models/product/product-repository';
import { ProductDocument, ProductName } from '../schemas/product.schema';

export class MongoProductRepository implements ProductRepository {
  constructor(
    @InjectModel(ProductName)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  nextId(): ProductId {
    return new ProductId(nanoid());
  }

  async findById(id: ProductId): Promise<Product | undefined> {
    const doc = await this.productModel.findById(id);
    if (!doc) return undefined;
    return this.documentToModel(doc);
  }

  async save(product: Product): Promise<void> {
    const doc = this.modelToDocument(product);
    await doc.updateOne(doc, { upsert: true });
  }

  private modelToDocument(model: Product) {
    return new this.productModel({
      _id: model.productId.id,
      creatorId: model.productOwnerId.id,
      name: model.name,
      desc: model.description,
      logo: model.logo,
      createdAt: model.createdAt,
    });
  }

  private documentToModel(doc: ProductDocument) {
    const productId = new ProductId(doc._id);
    const productOwnerId = new ProductOwnerId(doc.creatorId);
    return new Product(
      productId,
      productOwnerId,
      doc.name,
      doc.desc,
      doc.createdAt,
    );
  }
}
