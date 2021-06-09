import { Inject } from '@nestjs/common';

export const ProjectQueryToken = Symbol('项目查询器');

export const ProjectQueryImplement = () => Inject(ProjectQueryToken);
