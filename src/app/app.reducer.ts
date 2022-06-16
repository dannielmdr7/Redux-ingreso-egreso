import { ActionReducerMap } from '@ngrx/store';
import * as uiReducer from './shared/ui.reducer';
import * as authReducer from './auth/auth.reducer';



export interface AppState {
   ui:uiReducer.State,
   user: authReducer.State
}



export const appReducers: ActionReducerMap<AppState> = {
   ui:uiReducer.uiReducer,
   user:authReducer.authReducer
}