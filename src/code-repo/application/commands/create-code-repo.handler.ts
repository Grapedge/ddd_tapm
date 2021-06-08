import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { ProductId } from 'src/agile-pm/domain/models/product/product-id';
import { CodeRepo } from 'src/code-repo/domain/models/code-repo';
import { CodeRepoRepository } from 'src/code-repo/domain/models/code-repo-repository';
import { InjectCodeRepoRepository } from '../decorators/code-repo-repository.decorator';
import { CreateCodeRepoCommand } from './create-code-repo.command';

@CommandHandler(CreateCodeRepoCommand)
export class CreateCodeRepoHandler
  implements ICommandHandler<CreateCodeRepoCommand>
{
  constructor(
    @InjectCodeRepoRepository()
    private readonly repository: CodeRepoRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateCodeRepoCommand): Promise<string> {
    const codeRepoId = this.repository.nextId();
    const productId = new ProductId(command.productId);

    const codeRepo = this.publisher.mergeObjectContext(
      new CodeRepo(codeRepoId, productId, command.homePageUrl, command.gitUrl),
    );

    codeRepo.create();
    await this.repository.save(codeRepo);
    codeRepo.commit();

    return codeRepoId.id;
  }
}
