import { Logger } from '@nestjs/common';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { ProductOwnerId } from 'src/agile-pm/domain/models/product/product-owner-id';
import { Team } from 'src/agile-pm/domain/models/team/team';
import { TeamRepository } from 'src/agile-pm/domain/models/team/team-repository';
import { InjectTeamRepository } from '../decorators/teama-repository.decorator';
import { CreateTeamCommand } from './create-team.command';

@CommandHandler(CreateTeamCommand)
export class CreateTeamHandler implements ICommandHandler<CreateTeamCommand> {
  private readonly logger = new Logger(CreateTeamHandler.name);

  constructor(
    @InjectTeamRepository()
    private readonly repository: TeamRepository,
    private publisher: EventPublisher,
  ) {}

  async execute(command: CreateTeamCommand): Promise<void> {
    this.logger.log(
      `开始创建团队：Product[${command.productId}], User:[${command.productOwnerId}]`,
    );
    const team = this.publisher.mergeObjectContext(
      new Team(
        new ProductId(command.productId),
        new ProductOwnerId(command.productOwnerId),
        [],
      ),
    );
    team.create();
    await this.repository.save(team);
    team.commit();
  }
}
