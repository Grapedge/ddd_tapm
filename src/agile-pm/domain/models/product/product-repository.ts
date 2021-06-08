import { Product } from './product';
import { ProductId } from './product-id';

export interface ProductRepository {
  nextId(): ProductId;
  findById(id: ProductId): Promise<Product | undefined>;
  save(product: Product): Promise<void>;
}
