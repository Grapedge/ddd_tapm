import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { AgileCommandHandlers } from './application/commands';
import { AgileControllers } from './application/controllers';
import { ProductRepoistoryToken } from './application/decorators/product-repository.decorator';
import { TeamRepoistoryToken } from './application/decorators/teama-repository.decorator';
import { AgileQueryHandlers } from './application/queries';
import { AgileSagas } from './application/sagas';
import { MongoProductRepository } from './infrastructure/repositories/mongo-product-repository';
import { MongoTeamRepository } from './infrastructure/repositories/mongo-team-repository';
import {
  ProductName,
  ProductSchema,
} from './infrastructure/schemas/product.schema';
import { TeamName, TeamSchema } from './infrastructure/schemas/team.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ProductName,
        schema: ProductSchema,
      },
      {
        name: TeamName,
        schema: TeamSchema,
      },
    ]),
    CqrsModule,
  ],
  providers: [
    ...AgileCommandHandlers,
    ...AgileQueryHandlers,
    ...AgileSagas,
    {
      provide: ProductRepoistoryToken,
      useClass: MongoProductRepository,
    },
    {
      provide: TeamRepoistoryToken,
      useClass: MongoTeamRepository,
    },
  ],
  controllers: [...AgileControllers],
})
export class AgileModule {}
