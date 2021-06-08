import { IEvent } from '@nestjs/cqrs';

export class CodeRepoRemovedEvent implements IEvent {
  constructor(
    public readonly productId: string,
    public readonly codeRepoId: string,
  ) {}
}
