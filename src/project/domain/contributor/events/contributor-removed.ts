export class ContributorRemoved {
  constructor(
    public readonly projectId: string,
    public readonly contributorId: string,
  ) {}
}
