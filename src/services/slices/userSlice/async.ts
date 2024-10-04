import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  logoutApi,
  getUserApi,
  updateUserApi,
  getOrdersApi
} from '../../../utils/burger-api';
export const registerUser = createAsyncThunk(
  'user/registerUser',
  registerUserApi
);
export const loginUser = createAsyncThunk('user/loginUser', loginUserApi);
export const logoutUser = createAsyncThunk('user/logoutUser', logoutApi);
export const getUser = createAsyncThunk('user/getUser', getUserApi);
export const updateUser = createAsyncThunk('user/updateUser', updateUserApi);
export const getOrders = createAsyncThunk('user/getOrders', getOrdersApi);
