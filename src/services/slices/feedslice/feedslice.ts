import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';
import { getFeeds, getOrderByNumber } from './async';

export interface IFeedState {
  order: TOrder | null;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null | undefined;
  loading: boolean;
}

export const initialState: IFeedState = {
  order: null,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  loading: false
};

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.orders = action.payload.orders;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      })
      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const feedReducer = feedSlice.reducer;

export const selectOrder = (state: RootState) => state.feed.order;
export const selectOrders = (state: RootState) => state.feed.orders;
export const selectTotal = (state: RootState) => state.feed.total;
export const selectTotalToday = (state: RootState) => state.feed.totalToday;
