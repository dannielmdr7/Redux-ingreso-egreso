import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';

export const unSetItems = createAction('[IngresoEgreso] unSet items');
export const  setItems = createAction(
  '[IngresoEgreso] Set items',
  props<{items:IngresoEgreso[]}>()
  );
