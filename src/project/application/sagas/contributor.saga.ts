import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ContributorRole } from 'src/project/domain/contributor/contributor-role';
import { ProjectCreated } from 'src/project/domain/project/events/project-created';
import { AddControbutorCommand } from '../commands/add-contributor.command';

@Injectable()
export class ContributorSagas {
  @Saga()
  projectCreated = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(ProjectCreated),
      map(
        (event) =>
          new AddControbutorCommand(
            event.projectId,
            event.projectOwnerId,
            ContributorRole.ProjectManager,
          ),
      ),
    );
  };
}
