import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandHandlers } from './application/commands/handlers';
import { ContributorQueryToken } from './application/decorators/contributor-query.decorator';
import { ContributorRepositoryToken } from './application/decorators/contributor-repository.decorator';
import { ProjectQueryToken } from './application/decorators/project-query.decorator';
import { ProjectRepositoryToken } from './application/decorators/project-repository.decorator';
import { QueryHandlers } from './application/queries/handlers';
import { Sagas } from './application/sagas';
import { Contributor } from './domain/contributor/contributor';
import { Project } from './domain/project/project';
import { MongoContributorQuery } from './infrastructure/queries/mongo-contributor.query';
import { MongoProjectQuery } from './infrastructure/queries/mongo-project.query';
import { MongoContributorRepository } from './infrastructure/repositories/mongo-contributor.repository';
import { MongoProjectRepository } from './infrastructure/repositories/mongo-project.repository';
import { ContributorSchema } from './infrastructure/schemas/contributor.schema';
import { ProjectSchema } from './infrastructure/schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Project.name,
        schema: ProjectSchema,
      },
      {
        name: Contributor.name,
        schema: ContributorSchema,
      },
    ]),
    CqrsModule,
  ],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    ...Sagas,
    {
      provide: ProjectRepositoryToken,
      useClass: MongoProjectRepository,
    },
    {
      provide: ContributorRepositoryToken,
      useClass: MongoContributorRepository,
    },
    {
      provide: ProjectQueryToken,
      useClass: MongoProjectQuery,
    },
    {
      provide: ContributorQueryToken,
      useClass: MongoContributorQuery,
    },
  ],
})
export class ProjectModule {}
