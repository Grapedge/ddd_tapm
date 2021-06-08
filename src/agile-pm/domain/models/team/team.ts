import { AggregateRoot } from '@nestjs/cqrs';
import { Assert } from 'src/common/libs/assert.class';
import { UserId } from 'src/user/domain/models/user-id';
import { ProductId } from '../product/product-id';
import { ProductOwnerId } from '../product/product-owner-id';
import { TeamMember } from './team-member';

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
