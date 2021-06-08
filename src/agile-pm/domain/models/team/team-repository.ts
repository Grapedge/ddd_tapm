import { ProductId } from '../product/product-id';
import { Team } from './team';

export interface TeamRepository {
  findByProduct(productId: ProductId): Promise<Team | undefined>;
  save(team: Team): Promise<void>;
}
