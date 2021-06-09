import { AggregateRoot } from '@nestjs/cqrs';
import { ProjectId } from '../project/project-id';
import { ContributorId } from './contributor-id';
import { ContributorRole } from './contributor-role';
import { ContributorAdded } from './events/contributor-added';
import { ContributorQuit } from './events/contributor-quit';

export class Contributor extends AggregateRoot {
  private _ctbId: ContributorId;

  private _projectId: ProjectId;

  private _role: ContributorRole;

  constructor(
    projectId: ProjectId,
    ctbId: ContributorId,
    role: ContributorRole,
  ) {
    super();
    this._ctbId = ctbId;
    this._projectId = projectId;
    this.role = role;
  }

  /**
   * 添加贡献者
   */
  add() {
    this.apply(
      new ContributorAdded(this.projectId.id, this.contributorId.id, this.role),
    );
  }

  /**
   * 修改贡献者权限
   * @param role
   */
  assignRole(role: ContributorRole) {
    this.role = role;
  }

  /**
   * 贡献者退出项目
   */
  quit() {
    this.apply(new ContributorQuit(this.projectId.id, this.contributorId.id));
  }

  /**
   * 移除贡献者
   */
  remove() {}

  get contributorId() {
    return this._ctbId;
  }

  get projectId() {
    return this._projectId;
  }

  get role() {
    return this._role;
  }

  private set role(role: ContributorRole) {
    this._role = role;
  }
}
