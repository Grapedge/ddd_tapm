import { Inject } from '@nestjs/common';

export const ContributorRepositoryToken = Symbol('贡献者资源库');

export const ContributorRepositoryImplement = () =>
  Inject(ContributorRepositoryToken);
