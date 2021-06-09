import { Inject } from '@nestjs/common';

export const GitRepositoryRepositoryToken = Symbol('Git 仓库资源库');

export const GitRepositoryRepositoryImplement = () =>
  Inject(GitRepositoryRepositoryToken);
