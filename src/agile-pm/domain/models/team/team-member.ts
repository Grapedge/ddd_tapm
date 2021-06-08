import { UserId } from 'src/user/domain/models/user-id';
import { ProductId } from '../product/product-id';
import { TeamMemberRole } from './team-member-role';

export class TeamMember {
  protected _productId: ProductId;

  protected _userId: UserId;

  protected _role: TeamMemberRole;

  constructor(productId: ProductId, userId: UserId, role: TeamMemberRole) {
    this._productId = productId;
    this.userId = userId;
    this.role = role;
  }

  changeMemberRole(role: TeamMemberRole) {
    this.role = role;
  }

  get productId() {
    return this._productId;
  }

  get userId() {
    return this._userId;
  }

  private set userId(userId: UserId) {
    this._userId = userId;
  }

  get role() {
    return this._role;
  }

  private set role(role: TeamMemberRole) {
    this._role = role;
  }
}
