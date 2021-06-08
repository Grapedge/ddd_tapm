import { ProductOwnerId } from './product-owner-id';

export class ProductOwner {
  private _productOwnerId: ProductOwnerId;

  private _name: string;

  constructor(productOwnerId: ProductOwnerId, name: string) {
    this._productOwnerId = productOwnerId;
    this.name = name;
  }

  get productOwnerId() {
    return this._productOwnerId;
  }

  get name() {
    return this._name;
  }

  private set name(name: string) {
    this._name = name;
  }
}
