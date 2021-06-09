import { Inject } from '@nestjs/common';

export const ContributorQueryToken = Symbol('贡献者查询器');

export const ContributorQueryImplement = () => Inject(ContributorQueryToken);
