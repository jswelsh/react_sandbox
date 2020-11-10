import { combineReducers, Reducer } from 'redux';
import { IUser } from './user/UserTypes';
import { userReducer } from './user/UserReducer';

export interface IAppState {
  user: IUser
}

export const rootReducer: Reducer<IAppState> = combineReducers<IAppState>({
  user: userReducer
} as any);