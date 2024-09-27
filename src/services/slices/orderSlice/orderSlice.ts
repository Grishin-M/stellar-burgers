import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from 'src/services/store';
import { newOrder } from './async';

export interface IOrderState {
  order: TOrder | null;
  error: string | null | undefined;
  loading: boolean;
}

export const initialState: IOrderState = {
  order: null,
  error: null,
  loading: false
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    deleteOrder: (state) => {
      state.order = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(newOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(newOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const orderReducer = orderSlice.reducer;

export const { deleteOrder } = orderSlice.actions;

export const selectOrder = (state: RootState) => state.order.order;
export const selectOrderLoading = (state: RootState) => state.order.loading;
