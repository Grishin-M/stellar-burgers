import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '../../../utils/burger-api';

export const newOrder = createAsyncThunk('order/newOrder', orderBurgerApi);
