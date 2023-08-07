import { configureStore, combineReducers } from '@reduxjs/toolkit';
import Reducer from './Reducer';

const rootReducer = combineReducers({
  toolkit: Reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
