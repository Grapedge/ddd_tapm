import { Inject } from '@nestjs/common';

export const ProjectRepositoryToken = Symbol('项目资源库');

export const ProjectRepositoryImplement = () => Inject(ProjectRepositoryToken);
