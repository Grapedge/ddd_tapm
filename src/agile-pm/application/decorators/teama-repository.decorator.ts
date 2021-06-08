import { Inject } from '@nestjs/common';

export const TeamRepoistoryToken = Symbol('Team Repo');

export const InjectTeamRepository = () => Inject(TeamRepoistoryToken);
