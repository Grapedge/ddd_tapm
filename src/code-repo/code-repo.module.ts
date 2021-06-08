import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CodeRepoCommandHandlers } from './application/commands';
import { CodeRepoControllers } from './application/controllers';
import { CodeRepoRepositoryToken } from './application/decorators/code-repo-repository.decorator';
import { MongoCodeRepoRepository } from './infrastructure/repositories/mongo-code-repo.repository';
import {
  CodeRepoName,
  CodeRepoSchema,
} from './infrastructure/schemas/code-repo.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: CodeRepoName,
        schema: CodeRepoSchema,
      },
    ]),
    CqrsModule,
  ],
  controllers: [...CodeRepoControllers],
  providers: [
    ...CodeRepoCommandHandlers,
    {
      provide: CodeRepoRepositoryToken,
      useClass: MongoCodeRepoRepository,
    },
  ],
})
export class CodeRepoModule {}
