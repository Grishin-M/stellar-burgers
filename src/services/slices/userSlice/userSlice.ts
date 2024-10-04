import { createSlice } from '@reduxjs/toolkit';
import { TUser, TOrder } from '@utils-types';
import { RootState } from 'src/services/store';
import { deleteCookie, setCookie } from '../../../utils/cookie';
import {
  getOrders,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from './async';

export interface IUserState {
  user: TUser | null;
  isAuth: boolean;
  error: string | null | undefined;
  orders: TOrder[];
}

export const initialState: IUserState = {
  user: {
    email: '',
    name: ''
  },
  isAuth: false,
  error: null,
  orders: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        state.user = {
          email: '',
          name: ''
        };
      })
      .addCase(loginUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.isAuth = false;
        state.user = {
          email: '',
          name: ''
        };
      })
      .addCase(logoutUser.pending, (state) => {
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.error = null;
        state.user = {
          email: '',
          name: ''
        };
        state.isAuth = false;
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state) => {
        state.error = null;
        state.isAuth = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.error = null;
        state.user = action.payload.user;
        state.isAuth = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.user = {
          email: '',
          name: ''
        };
      })
      .addCase(updateUser.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.error = null;
        state.isAuth = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(getOrders.pending, (state) => {
        state.error = null;
        state.isAuth = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.error = null;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.error.message;
      });
  }
});

export const userReducer = userSlice.reducer;

export const selectUser = (state: RootState) => state.user.user;
export const selectAuth = (state: RootState) => state.user.isAuth;
export const selectOrder = (state: RootState) => state.user.orders;
