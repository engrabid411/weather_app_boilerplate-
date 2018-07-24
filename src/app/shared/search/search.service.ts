import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class SearchService {
  apiRoot = 'http://photon.komoot.de/api/';
  constructor(private http: Http) {}

  search(term: string) {
    const apiURL = `${this.apiRoot}?q=${term.split(' ').join('+')}&limit=5`;
    return this.http.get(apiURL)
        .map(res => {
          return res.json().features.map(item => {
            return item;
          });
        });
  }

}
