import { Assert } from 'src/common/libs/assert.class';
import { UserId } from 'src/user/domain/models/user-id';
import { ProductId } from '../product/product-id';
import { TeamMemberRole } from './team-member-role';

export class TeamMember {
  protected _productId: ProductId;

  protected _userId: UserId;

  protected _name: string;

  protected _role: TeamMemberRole;

  constructor(
    productId: ProductId,
    userId: UserId,
    name: string,
    role: TeamMemberRole,
  ) {
    this._productId = productId;
    this.userId = userId;
    this.name = name;
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

  get name() {
    return this._name;
  }

  private set name(name: string) {
    Assert.badRequest(name.length <= 50, '团队成员名称不能超过五十个字符');
    this._name = name;
  }

  get role() {
    return this._role;
  }

  private set role(role: TeamMemberRole) {
    this._role = role;
  }
}
