import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, FormGroup, FormControlName } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import 'rxjs/Rx';
import { Store, Action } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import {
  ActionLocationRetrieve,
  selectorLocations
} from './search.reducer';

@Component({
  selector: 'mwt-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  @Input() placeholder: string;
  hasFocus = false;
  searchform: FormGroup;
  loading = false;
  result;
  constructor(public store: Store<any> ) {}

  ngOnInit() {
    this.searchform = new FormGroup({
      'searchField': new FormControl()
    });
    this.store
      .select(selectorLocations)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((locations: any) => {
        this.result = locations.locationsObj;
        this.loading = locations.loading;
      });
    this.searchform.get('searchField').valueChanges.subscribe( term => this.onTermChange(term));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  onTermChange(term: string) {
    this.store.dispatch(new ActionLocationRetrieve({ term }));
  }

}
