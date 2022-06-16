import { createReducer, on } from '@ngrx/store';
import * as uiActions from './ui.actions';

export interface State {
  isLoading: boolean;
}

export const initialState: State = {
  isLoading: false,
}

export const uiReducer = createReducer(initialState,

  on( uiActions.isLoading, state => ({ ...state, isLoading: true })),
  on(uiActions.stopLoading, state => ({ ...state, isLoading: false })),


);
