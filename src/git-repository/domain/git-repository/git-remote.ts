import { Assert } from 'src/common/libs/assert.class';

export class GitRemote {
  private _gitUrl: string;

  private _homePageUrl: string;

  constructor(gitUrl: string, homePageUrl: string) {
    this.gitUrl = gitUrl;
    this.homePageUrl = homePageUrl;
  }

  get gitUrl() {
    return this._gitUrl;
  }

  private set gitUrl(value: string) {
    this._gitUrl = value;
  }

  get homePageUrl() {
    return this._homePageUrl;
  }

  private set homePageUrl(value: string) {
    Assert.badRequest(
      value.length === 0 || /^https?:\/\//.test(value),
      '主页地址无效',
    );
    this._homePageUrl = value;
  }
}
