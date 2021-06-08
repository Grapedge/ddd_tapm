import { AggregateRoot } from '@nestjs/cqrs';
import { Assert } from 'src/common/libs/assert.class';
import { ProductCreatedEvent } from './product-created';
import { ProductId } from './product-id';
import { ProductOwnerId } from './product-owner-id';

export class Product extends AggregateRoot {
  private _productId: ProductId;

  private _productOwnerId: ProductOwnerId;

  private _name: string;

  private _description: string;

  private _logo: string;

  private _createdAt: Date;

  constructor(
    productId: ProductId,
    productOwnerId: ProductOwnerId,
    name: string,
    description: string,
    createdAt: Date,
  ) {
    super();
    this._productId = productId;
    this.productOwnerId = productOwnerId;
    this.name = name;
    this.description = description;
    this._createdAt = createdAt;
  }

  /**
   * 创建产品
   */
  create() {
    this.apply(
      new ProductCreatedEvent(
        this.productId.id,
        this.productOwnerId.id,
        this.name,
        this.description,
      ),
    );
  }

  /**
   * 分配 logo
   * @param url
   */
  changeLogo(url: string) {
    this.logo = url;
  }

  /**
   * 命名
   * @param name
   */
  rename(name: string) {
    this.name = name;
  }

  /**
   * 更改描述
   * @param description
   */
  changeDescription(description: string) {
    this.description = description;
  }

  get productId() {
    return this._productId;
  }

  get name() {
    return this._name;
  }

  private set name(name: string) {
    Assert.badRequest(
      name.length >= 1 && name.length <= 20,
      '产品名称应介于一到二十个字符之间',
    );
    this._name = name;
  }

  get description() {
    return this._description;
  }

  private set description(content: string) {
    Assert.badRequest(
      content.length >= 1 && content.length <= 50,
      '产品描述应介于一到五十个字符之间',
    );
    this._description = content;
  }

  get logo() {
    return this._logo;
  }

  private set logo(url: string) {
    // URL 要么为空，要么为标准格式
    Assert.badRequest(
      url.length === 0 || /^https?:\/\//.test(url),
      `Logo 地址不合法：${url}`,
    );
    this._logo = url;
  }

  get productOwnerId() {
    return this._productOwnerId;
  }

  private set productOwnerId(ownerId: ProductOwnerId) {
    this._productOwnerId = ownerId;
  }

  get createdAt() {
    return this._createdAt;
  }
}
