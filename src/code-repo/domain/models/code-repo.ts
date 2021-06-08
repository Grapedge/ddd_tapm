import { AggregateRoot } from '@nestjs/cqrs';
import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { Assert } from 'src/common/libs/assert.class';
import { CodeRepoCreatedEvent } from './code-repo-created';
import { CodeRepoId } from './code-repo-id';
import { CodeRepoRemovedEvent } from './code-repo-removed';

export class CodeRepo extends AggregateRoot {
  private _codeRepoId: CodeRepoId;

  private _productId: ProductId;

  private _homePageUrl: string;

  private _gitUrl: string;

  constructor(
    codeRepoId: CodeRepoId,
    productId: ProductId,
    homePageUrl: string,
    gitUrl: string,
  ) {
    super();
    this._codeRepoId = codeRepoId;
    this._productId = productId;
    this.homePageUrl = homePageUrl;
    this.gitUrl = gitUrl;
  }

  /**
   * 创建代码仓库
   */
  create() {
    this.apply(new CodeRepoCreatedEvent(this.productId.id, this.codeRepoId.id));
  }

  /**
   * 更改首页 url
   * @param url
   */
  bindHomePageUrl(url: string) {
    this.homePageUrl = url;
  }

  /**
   * 更改 git 仓库 url
   * @param url
   */
  bindGitUrl(url: string) {
    this.gitUrl = url;
  }

  /**
   * 删除代码仓库
   */
  remove() {
    this.apply(new CodeRepoRemovedEvent(this.productId.id, this.codeRepoId.id));
  }

  get codeRepoId() {
    return this._codeRepoId;
  }

  get productId() {
    return this._productId;
  }

  get gitUrl() {
    return this._gitUrl;
  }

  private set gitUrl(url) {
    this._gitUrl = url;
  }

  get homePageUrl() {
    return this._homePageUrl;
  }

  private set homePageUrl(url: string) {
    Assert.badRequest(/^https?:\/\//.test(url));
    this._homePageUrl = url;
  }
}
