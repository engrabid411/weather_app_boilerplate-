import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { ForecastsRoutingModule } from './forecasts-routing.module';
import { ForecastsComponent } from './forecasts/forecasts.component';
import { TodosComponent } from './todos/todos.component';
import { todosReducer } from './todos/todos.reducer';
import { TodosEffects } from './todos/todos.effects';
import { StockMarketComponent } from './stock-market/stock-market.component';
import { stockMarketReducer } from './stock-market/stock-market.reducer';
import { StockMarketEffects } from './stock-market/stock-market.effects';
import { StockMarketService } from './stock-market/stock-market.service';
import { ParentComponent } from './theming/parent/parent.component';
import { ChildComponent } from './theming/child/child.component';
import { AuthenticatedComponent } from './authenticated/authenticated.component';

@NgModule({
  imports: [
    SharedModule,
    ForecastsRoutingModule,
    StoreModule.forFeature('forecasts', {
      todos: todosReducer,
      stocks: stockMarketReducer
    }),
    EffectsModule.forFeature([TodosEffects, StockMarketEffects])
  ],
  declarations: [
    ForecastsComponent,
    TodosComponent,
    StockMarketComponent,
    ParentComponent,
    ChildComponent,
    AuthenticatedComponent
  ],
  providers: [StockMarketService]
})
export class ForecastsModule {
  constructor() {}
}
