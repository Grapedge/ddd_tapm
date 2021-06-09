import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ProjectController } from './project/project.controller';

@Module({
  imports: [CqrsModule],
  controllers: [ProjectController],
})
export class GatewayModule {}
