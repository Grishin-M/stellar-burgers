import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { feedReducer } from './slices/feedSlice/feedSlice';
import { ingredientsReducer } from './slices/ingredientsSlice/ingredientsSlice';
import { orderReducer } from './slices/orderSlice/orderSlice';
import { userReducer } from './slices/userSlice/userSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  burgerConstructor: burgerConstructorReducer,
  ingredients: ingredientsReducer,
  order: orderReducer,
  feed: feedReducer
});
