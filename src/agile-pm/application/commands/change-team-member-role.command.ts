import { ICommand } from '@nestjs/cqrs';
import { TeamMemberRole } from 'src/agile-pm/domain/models/team/team-member-role';

export class ChangeTeamMemberRole implements ICommand {
  constructor(
    public readonly productId: string,
    public readonly productOwnerId: string,
    public readonly teamMemberId: string,
    public readonly teamMemberRole: TeamMemberRole,
  ) {}
}
