import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { isLoading, stopLoading } from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {
  ingresoForm!: FormGroup;
  tipo = 'ingreso'
  uiSubscription: Subscription = new Subscription;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }
  
  ngOnInit(): void {
    this.ingresoForm = this.fb.group({
      description: ['', [Validators.required]],
      monto: ['', [Validators.required, Validators.min(0)]],
    })
    this.uiSubscription = this.store.select('ui').subscribe(ui => {
      this.loading = ui.isLoading
    })
  }
  ngOnDestroy(): void {
  this.uiSubscription.unsubscribe();
  }
  guardar() {
    if (this.ingresoForm.invalid) return;
    this.store.dispatch(isLoading())
    const { description, monto } = this.ingresoForm.value;
    const ingresoEgreso: IngresoEgreso = { description, monto, tipo: this.tipo };
    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(stopLoading());
        Swal.fire('Registro Creado', description, 'success');
        this.ingresoForm.reset();
      })
      .catch((err) => {
        this.store.dispatch(stopLoading());
        Swal.fire('Error', err.message, 'error');
      });


  }

}
