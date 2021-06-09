import { nanoid } from 'nanoid';
import { Identity } from './identity';

export abstract class AbstractId implements Identity {
  private _id: string;

  constructor(id?: string) {
    if (!id) {
      this.id = nanoid();
    } else {
      this.id = id;
    }
  }

  get id() {
    return this._id;
  }

  private set id(id: string) {
    this._id = id;
  }

  private get idName() {
    return (this as any).constructor.name;
  }

  equals(otherId: AbstractId) {
    return this.idName === otherId.idName && this._id === otherId._id;
  }

  toString() {
    return `${this.idName}[${this.id}]`;
  }
}
