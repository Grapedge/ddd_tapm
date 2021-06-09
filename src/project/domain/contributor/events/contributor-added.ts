import { IEvent } from '@nestjs/cqrs';
import { ContributorRole } from '../contributor-role';

export class ContributorAdded implements IEvent {
  constructor(
    public readonly projectId: string,
    public readonly userId: string,
    public readonly role: ContributorRole,
  ) {}
}
