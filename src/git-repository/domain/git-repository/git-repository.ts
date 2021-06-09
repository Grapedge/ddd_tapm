import { AggregateRoot } from '@nestjs/cqrs';
import { Assert } from 'src/common/libs/assert.class';
import { ContributorId } from 'src/project/domain/contributor/contributor-id';
import { ProjectId } from 'src/project/domain/project/project-id';
import { GitRepositoryCreated } from './events/git-repository-created';
import { GitRepositoryRemoved } from './events/git-repository-removed';
import { GitRemote } from './git-remote';
import { GitRepositoryId } from './git-repository-id';

export class GitRepository extends AggregateRoot {
  private _projectId: ProjectId;

  private _gitRepoId: GitRepositoryId;

  private _name: string; // 仓库名

  private _description: string;

  private _gitRemote: GitRemote;

  private _creatorId: ContributorId;

  constructor(
    projectId: ProjectId,
    gitRepoId: GitRepositoryId,
    name: string,
    description: string,
    gitRemote: GitRemote,
    creatorId: ContributorId,
  ) {
    super();
    this._projectId = projectId;
    this._gitRepoId = gitRepoId;
    this.name = name;
    this.description = description;
    this.gitRemote = gitRemote;
    this._creatorId = creatorId;
  }

  /**
   * 创建代码仓库
   */
  create() {
    this.apply(new GitRepositoryCreated(this.projectId.id, this.gitRepoId.id));
  }

  /**
   * 更改远程代码信息
   * @param gitRemote
   */
  assignGitRemote(gitRemote: GitRemote) {
    this._gitRemote = gitRemote;
  }

  /**
   * 更改仓库名
   * @param name
   */
  assignName(name: string) {
    this.name = name;
  }

  /**
   * 删除代码仓库
   */
  remove() {
    this.apply(new GitRepositoryRemoved(this.projectId.id, this.gitRepoId.id));
  }

  get gitRepoId() {
    return this._gitRepoId;
  }

  get projectId() {
    return this._projectId;
  }

  get gitRemote() {
    return this._gitRemote;
  }

  private set gitRemote(value: GitRemote) {
    this._gitRemote = value;
  }

  get name() {
    return this._name;
  }

  private set name(value: string) {
    Assert.badRequest(value.length <= 15, '仓库名称不能超过 15 个字符');
    this._name = value;
  }

  get description() {
    return this._description;
  }

  private set description(value: string) {
    Assert.badRequest(value.length <= 30, '仓库描述不能超过 30 个字符');
    this._description = value;
  }

  get creatorId() {
    return this._creatorId;
  }
}
