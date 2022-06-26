import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { filter, Subscription } from 'rxjs';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';
import { AppState } from '../app.reducer';

import { IngresoEgresoService } from '../services/ingreso-egreso.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubscription: Subscription = new Subscription();
  ingresoSubscribe: Subscription = new Subscription();
  constructor(private store: Store<AppState>, private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.userSubscription = this.store.select('user')
      .pipe(
        filter(user => user.user.uid !== '')
      )
      .subscribe(user => {
        this.ingresoSubscribe = this.ingresoEgresoService.initIngresosEgresosListener(user.user.uid)
          .subscribe(ingresosEgresos => {

            this.store.dispatch( ingresoEgresoActions.setItems( { items: ingresosEgresos} ) )

          })
      })
  }

  ngOnDestroy(): void {
    this.ingresoSubscribe.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
