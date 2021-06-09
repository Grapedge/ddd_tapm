import { AggregateRoot } from '@nestjs/cqrs';
import { Assert } from 'src/common/libs/assert.class';
import { ProjectArchived } from './events/project-archived';
import { ProjectCreated } from './events/project-created';
import { ProjectId } from './project-id';
import { ProjectOwnerId } from './project-owner-id';

export class Project extends AggregateRoot {
  private _projectId: ProjectId;

  private _projectOwnerId: ProjectOwnerId;

  private _name: string;

  private _description: string;

  private _logoUrl: string;

  private _creaetdAt: Date;

  private _archivedAt?: Date;

  constructor(
    projectId: ProjectId,
    projectOwnerId: ProjectOwnerId,
    name: string,
    description: string,
    logoUrl: string,
    createdAt: Date,
    archivedAt: Date | undefined, // TODO
  ) {
    super();
    this._projectId = projectId;
    this.projectOwnerId = projectOwnerId;
    this.name = name;
    this.description = description;
    this.logoUrl = logoUrl;
    this._creaetdAt = createdAt;
    this._archivedAt = archivedAt;
  }

  /**
   * 项目归档
   */
  archive() {
    this.assertNotArchive();
    this.archivedAt = new Date();
    this.apply(new ProjectArchived(this.projectId.id, this.archivedAt));
  }

  /**
   * 创建项目
   */
  create() {
    this.assertNotArchive();
    this.apply(
      new ProjectCreated(
        this.projectId.id,
        this.projectOwnerId.id,
        this.name,
        this.description,
        this.logoUrl,
      ),
    );
  }

  /**
   * 项目命名
   * @param name 项目名
   */
  assignName(name: string) {
    this.assertNotArchive();
    this.name = name;
  }

  /**
   * 设置项目描述
   * @param description
   */
  assginDescription(description: string) {
    this.assertNotArchive();
    this.description = description;
  }

  /**
   * 修改项目logo
   * @param logo
   */
  assignLogo(logo: string) {
    this.assertNotArchive();
    this.logoUrl = logo;
  }

  get projectId() {
    return this._projectId;
  }

  get projectOwnerId() {
    return this._projectOwnerId;
  }

  private set projectOwnerId(value: ProjectOwnerId) {
    this._projectOwnerId = value;
  }

  get name() {
    return this._name;
  }

  private set name(value: string) {
    Assert.badRequest(value.length >= 1, '项目名称必须大于等于 1 个字符');
    Assert.badRequest(value.length <= 20, '项目名称不能超过 20 个字符');
    this._name = value;
  }

  get description() {
    return this._description;
  }

  private set description(value: string) {
    Assert.badRequest(value.length <= 50, '项目描述不能超过 50 字');
    this._description = value;
  }

  get logoUrl() {
    return this._logoUrl;
  }

  private set logoUrl(value: string) {
    Assert.badRequest(
      value.length === 0 || /https?:\/\//.test(value),
      'Logo 地址不合法',
    );
    this._logoUrl = value;
  }

  get createdAt() {
    return this._creaetdAt;
  }

  get archivedAt() {
    return this._archivedAt;
  }

  private set archivedAt(value: Date) {
    this._archivedAt = value;
  }

  private assertNotArchive() {
    Assert.forbidden(!this._archivedAt, '项目已归档');
  }
}
