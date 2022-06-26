import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { IngresoEgreso } from 'src/app/models/ingreso-egreso.model';
import { IngresoEgresoService } from 'src/app/services/ingreso-egreso.service';
import Swal from 'sweetalert2';
import { AppStateWhitIngreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  ingresosEgresos: IngresoEgreso[] = [];
  ingresosSubscription: Subscription = new Subscription;

  constructor(private store: Store<AppStateWhitIngreso>, private ingresoEgresoService:IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresosSubscription = this.store.select('ingresosEgresos').subscribe(({ items }) => this.ingresosEgresos = items)
  }
  ngOnDestroy(): void {
    this.ingresosSubscription.unsubscribe();
  }
  deleteItem(uid: string) {
    this.ingresoEgresoService
      .borrarIngresoEgreso(uid)
      .then(()=>{
        Swal.fire('Borrado','Item Borrado correctamente','success');
      }
      )
      .catch((err)=>{
        Swal.fire('Error', err.message  ,'error');
      });
  }

}
