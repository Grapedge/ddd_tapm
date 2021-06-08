export class CodeRepoCreatedEvent {
  constructor(
    public readonly productId: string,
    public readonly codeRepoId: string,
    public readonly gitUrl: string,
    public readonly homePageUrl: string,
  ) {}
}
