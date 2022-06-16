import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.model';
import { setUser, unSetUser } from './auth.actions';

export interface State {
  user: Usuario;
}

export const initialState: State = {
  user: { email: '', nombre: '', uid: '' },
}

export const authReducer = createReducer(initialState,

  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(unSetUser, (state) => ({ ...state, user: { email: '', nombre: '', uid: '' } })),


);
