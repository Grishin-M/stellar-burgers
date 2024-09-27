import { getFeedsApi, getOrderByNumberApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('feed/getFeeds', getFeedsApi);
export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  getOrderByNumberApi
);
