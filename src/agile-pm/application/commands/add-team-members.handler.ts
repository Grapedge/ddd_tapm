import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { TeamMember } from 'src/agile-pm/domain/models/team/team-member';
import { TeamMemberRole } from 'src/agile-pm/domain/models/team/team-member-role';
import { TeamRepository } from 'src/agile-pm/domain/models/team/team-repository';
import { UserId } from 'src/user/domain/models/user-id';
import { InjectTeamRepository } from '../decorators/teama-repository.decorator';
import { AddTeamMembersCommand } from './add-team-members.command';

@CommandHandler(AddTeamMembersCommand)
export class AddTeamMembersHandler
  implements ICommandHandler<AddTeamMembersCommand>
{
  constructor(
    @InjectTeamRepository()
    private readonly repository: TeamRepository,
  ) {}

  async execute(command: AddTeamMembersCommand): Promise<void> {
    const productId = new ProductId(command.productId);
    const team = await this.repository.findByProduct(productId);
    const teamMemberIds = command.teamMemberIds.filter(
      (id, index) => command.teamMemberIds.indexOf(id) === index,
    );
    for (const userId of teamMemberIds) {
      const teamMember = new TeamMember(
        productId,
        new UserId(userId),
        TeamMemberRole.Visitor,
      );
      team.addTeamMember(teamMember);
    }
    await this.repository.save(team);
    team.commit();
  }
}
