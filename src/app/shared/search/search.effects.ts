import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';

import {
  ActionLocationRetrieve,
  ActionLocationRetrieveError,
  ActionLocationRetrieveSuccess,
  SEARCH_KEY,
  SearchActionTypes
} from './search.reducer';
import { SearchService } from './search.service';

@Injectable()
export class SearchEffects {
  constructor(
    private actions$: Actions<Action>,
    private service: SearchService
  ) {}

  @Effect()
  retrieveLocation(): Observable<Action> {
      // alert('i am effet');
    return this.actions$.ofType(SearchActionTypes.RETRIEVE).pipe(
      distinctUntilChanged(),
      debounceTime(500),
      switchMap((action: ActionLocationRetrieve) =>
        this.service
          .search(action.payload.term)
          .pipe(
            map(location => new ActionLocationRetrieveSuccess({ location })),
            catchError(error =>
              of(new ActionLocationRetrieveError({ error }))
            )
          )
      )
    );
  }
}
