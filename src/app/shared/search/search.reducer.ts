import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

export const SEARCH_KEY = 'SEARCH';

export enum SearchActionTypes {
  RETRIEVE = '[Search] Retrieve',
  RETRIEVE_SUCCESS = '[Search] Retrieve Success',
  RETRIEVE_ERROR = '[Search] Retrieve Error'
}

export class ActionLocationRetrieve implements Action {
  readonly type = SearchActionTypes.RETRIEVE;
  constructor(public payload: { term: string }) {}
}

export class ActionLocationRetrieveSuccess implements Action {
  readonly type = SearchActionTypes.RETRIEVE_SUCCESS;
  constructor(public payload: { location: Location }) {}
}

export class ActionLocationRetrieveError implements Action {
  readonly type = SearchActionTypes.RETRIEVE_ERROR;
  constructor(public payload: { error: HttpErrorResponse }) {}
}

export type SearchActions =
  | ActionLocationRetrieve
  | ActionLocationRetrieveSuccess
  | ActionLocationRetrieveError;

export const initialState: SearchState = {
  term: '',
  location: null,
  loading: false
};

export const selectorLocations = state => {
    return {
        locationsObj : state.search.location,
        loading : state.search.loading
    };
}

export function searchReducer(
  state: SearchState = initialState,
  action: SearchActions
): SearchState {
  switch (action.type) {
    case SearchActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        error: null,
        term: action.payload.term
      };

    case SearchActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        location: action.payload.location,
        error: null
      };

    case SearchActionTypes.RETRIEVE_ERROR:
      return {
        ...state,
        loading: false,
        location: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}

export interface Location {
  term: string;
  name: string;
  state: string;
  country: string;
  change: string;
}

export interface SearchState {
  term: string;
  loading: boolean;
  location?: Location;
  error?: HttpErrorResponse;
}
