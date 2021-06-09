import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { GitRepositoryController } from './git-repository/git-repository.controller';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ProjectController, GitRepositoryController],
})
export class GatewayModule {}
