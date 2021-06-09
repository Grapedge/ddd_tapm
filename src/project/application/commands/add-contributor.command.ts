import { ICommand } from '@nestjs/cqrs';
import { ContributorRole } from 'src/project/domain/contributor/contributor-role';

export class AddControbutorCommand implements ICommand {
  constructor(
    public readonly projectId: string,
    public readonly userId: string,
    public readonly contributorRole: ContributorRole,
  ) {}
}
