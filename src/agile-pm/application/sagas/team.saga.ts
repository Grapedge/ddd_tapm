import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCreatedEvent } from 'src/agile-pm/domain/models/product/product-created';
import { CreateTeamCommand } from '../commands/create-team.command';

@Injectable()
export class TeamSaga {
  @Saga()
  productCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProductCreatedEvent),
      map(
        (event) => new CreateTeamCommand(event.productId, event.productOwnerId),
      ),
    );
  };
}
