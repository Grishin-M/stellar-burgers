import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const newOrder = createAsyncThunk('order/newOrder', orderBurgerApi);
