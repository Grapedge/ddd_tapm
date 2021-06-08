import { AggregateRoot } from '@nestjs/cqrs';
import { Assert } from 'src/common/libs/assert.class';
import { UserId } from 'src/user/domain/models/user-id';
import { ProductId } from '../product/product-id';
import { ProductOwnerId } from '../product/product-owner-id';
import { TeamCreatedEvent } from './team-created';
import { TeamMember } from './team-member';
import { TeamMemberRole } from './team-member-role';

export class Team extends AggregateRoot {
  private _productId: ProductId;

  private _productOwnerId: ProductOwnerId;

  private _teamMembers: Map<UserId, TeamMember>;

  constructor(
    productId: ProductId,
    productOwnerId: ProductOwnerId,
    teamMembers: TeamMember[],
  ) {
    super();
    this._productId = productId;
    this._productOwnerId = productOwnerId;
    this.teamMembers = teamMembers;
  }

  /**
   * 创建队伍
   */
  create() {
    this.apply(new TeamCreatedEvent(this.productId.id, this.productOwnerId.id));
  }

  /**
   * 添加成员
   * @param member
   */
  addTeamMember(member: TeamMember) {
    Assert.forbidden(member.productId.equals(this.productId));
    Assert.conflict(!this._teamMembers.has(member.userId), '该成员已存在');
    this._teamMembers.set(member.userId, member);
  }

  /**
   * 修改成员权限
   */
  changeTeamMemberRole(memberId: UserId, role: TeamMemberRole) {
    Assert.notFound(this._teamMembers.has(memberId), '未找到团队成员');
    const member = this._teamMembers.get(memberId);
    member.changeMemberRole(role);
  }

  /**
   * 移除团队成员
   * @param memberId
   */
  removeTeamMember(memberId: UserId) {
    Assert.notFound(this._teamMembers.has(memberId), '该成员不在团队中');
    this._teamMembers.delete(memberId);
  }

  get productId() {
    return this._productId;
  }

  get productOwnerId() {
    return this._productOwnerId;
  }

  get teamMembers() {
    return Array.from(this._teamMembers.values());
  }

  private set teamMembers(teamMembers: TeamMember[]) {
    const map = new Map<UserId, TeamMember>();
    for (const member of teamMembers) {
      Assert.badRequest(
        !map.has(member.userId),
        `成员 ${member.userId} 已存在，请检查是否存在异常`,
      );
      map.set(member.userId, member);
    }
  }
}
