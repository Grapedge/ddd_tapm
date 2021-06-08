import { Identity } from './identity';

export abstract class AbstractId implements Identity {
  private _id: string;

  constructor(id: string) {
    this.id = id;
  }

  get id() {
    return this._id;
  }

  private set id(id: string) {
    this._id = id;
  }

  // 如果代码最小化，则 constructor.name 可能不存在
  // 因此每个类需要手动输入需要展示的 Id 名称
  protected abstract idName: string;

  equals(otherId: AbstractId) {
    return this.idName === otherId.idName && this._id === otherId._id;
  }

  toString() {
    return `${this.idName}[${this.id}]`;
  }
}
