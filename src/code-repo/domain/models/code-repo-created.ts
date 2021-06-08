export class CodeRepoCreatedEvent {
  constructor(
    public readonly productId: string,
    public readonly codeRepoId: string,
  ) {}
}
