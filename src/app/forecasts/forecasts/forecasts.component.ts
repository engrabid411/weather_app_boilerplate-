import { Component, OnInit } from '@angular/core';

import { routerTransition } from '@app/core';

@Component({
  selector: 'mwt-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss'],
  animations: [routerTransition]
})
export class ForecastsComponent implements OnInit {
  forecasts = [
    { link: 'todos', label: 'Current' },
    { link: 'stock-market', label: 'Today' },
    { link: 'theming', label: 'Tonight' },
    { link: 'authenticated', label: 'Tomorrow' }
  ];

  constructor() {}

  ngOnInit() {}
}
