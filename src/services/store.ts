import { configureStore } from '@reduxjs/toolkit';
import { ingredientsSlice } from './ingredients/ingredients-slice';
import { constructorSlice } from './constructor/constructor-slice';
import { userSlice } from './user/user-slice';
import { ordersSlice } from './orders/orders-slice';
import { combineReducers } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  myconstructor: constructorSlice.reducer,
  user: userSlice.reducer,
  orders: ordersSlice.reducer
});

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
