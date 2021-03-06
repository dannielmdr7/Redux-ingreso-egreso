import { AppState } from 'src/app/app.reducer';
import { createReducer, on } from '@ngrx/store';
import { IngresoEgreso } from '../models/ingreso-egreso.model';
import * as ingresoEgresoActions from './ingreso-egreso.actions';

export interface State {
    items: IngresoEgreso[];
}

export interface AppStateWhitIngreso extends AppState{
    ingresosEgresos:State
}

export const initialState: State = {
   items: [],
}

export const ingresoEgresoReducer = createReducer(initialState,

    on(ingresoEgresoActions.setItems, (state,{items}) => ({ ...state, items: [...items]})),
    on(ingresoEgresoActions.unSetItems, (state,) => ({ ...state, items: []})),


);
