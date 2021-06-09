export class ContributorQuit {
  constructor(
    public readonly projectId: string,
    public readonly contributorId: string,
  ) {}
}
