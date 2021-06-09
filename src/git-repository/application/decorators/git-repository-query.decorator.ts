import { Inject } from '@nestjs/common';

export const GitRepositoryQueryToken = Symbol('Git 仓库查询器');

export const GitRepositoryQueryImplement = () =>
  Inject(GitRepositoryQueryToken);
