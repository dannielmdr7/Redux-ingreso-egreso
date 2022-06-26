import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from './shared/ui.reducer';
import * as authReducer from './auth/auth.reducer';

import * as ingresoEgresoReducer  from './ingreso-egreso/ingreso-egreso.reducer';


export interface AppState {
   ui:uiReducer.State,
   user: authReducer.State,
   ingresosEgresos: ingresoEgresoReducer.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui:uiReducer.uiReducer,
   user:authReducer.authReducer,
   ingresosEgresos: ingresoEgresoReducer.ingresoEgresoReducer
}