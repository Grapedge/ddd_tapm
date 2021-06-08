import { Inject } from '@nestjs/common';

export const CodeRepoRepositoryToken = Symbol('Code Repo');

export const InjectCodeRepoRepository = () => {
  return Inject(CodeRepoRepositoryToken);
};
