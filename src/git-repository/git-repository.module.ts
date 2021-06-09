import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './application/commands/handlers';
import { GitRepositoryRepositoryToken } from './application/decorators/git-repository-repository.decorator';
import { GitRepository } from './domain/git-repository/git-repository';
import { MongoGitRepoRepository } from './infrastructure/repositories/mongo-git-repository.repository';
import { GitRepositorySchema } from './infrastructure/schemas/git-repository.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GitRepository.name,
        schema: GitRepositorySchema,
      },
    ]),
    CqrsModule,
  ],
  providers: [
    ...CommandHandlers,
    {
      provide: GitRepositoryRepositoryToken,
      useClass: MongoGitRepoRepository,
    },
  ],
})
export class GitRepositoryModule {}
