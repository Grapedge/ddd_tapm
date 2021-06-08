import { UserId } from './user-id';

export class User {
  private _userId: UserId;

  constructor(userId: UserId) {
    this._userId = userId;
  }
}
