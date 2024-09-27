import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';
import { getIngredients } from './async';

export interface TIngredientsState {
  ingredients: TIngredient[];
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  error: string | null | undefined;
  loading: boolean;
}

const initialState: TIngredientsState = {
  ingredients: [],
  buns: [],
  mains: [],
  sauces: [],
  error: null,
  loading: false
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.ingredients = action.payload;
        if (action.payload) {
          state.buns = action.payload.filter((ing) => ing.type === 'bun');
          state.mains = action.payload.filter((ing) => ing.type === 'main');
          state.sauces = action.payload.filter((ing) => ing.type === 'sauce');
        }
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export const ingredientsReducer = ingredientsSlice.reducer;

export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectAllIngredients = (state: RootState) => state.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.loading;
