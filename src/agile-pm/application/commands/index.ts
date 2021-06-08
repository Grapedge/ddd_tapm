import { AddTeamMembersHandler } from './add-team-members.handler';
import { CreateProductHandler } from './create-product.handler';
import { CreateTeamHandler } from './create-team.handler';

export const AgileCommandHandlers = [
  CreateProductHandler,
  CreateTeamHandler,
  AddTeamMembersHandler,
];
