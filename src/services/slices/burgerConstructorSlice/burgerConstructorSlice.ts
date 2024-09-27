import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

type TConstructorState = {
  ingredients: TConstructorIngredient[];
  bun: TConstructorIngredient | null;
};

export const initialState: TConstructorState = {
  ingredients: [],
  bun: null
};

export const burgerConstructorSlice = createSlice({
  name: 'burger-constructor',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      const type = action.payload.type;

      if (type === 'bun') {
        state.bun = action.payload;
      } else if (type === 'main' || type === 'sauce') {
        state.ingredients.push(action.payload);
      }
    },
    deleteIngredient: (
      state,
      action: PayloadAction<TConstructorIngredient>
    ) => {
      state.ingredients = state.ingredients.filter(
        (el) => el.id !== action.payload.id
      );
    },
    removeConstructor: (state) => (state = initialState),
    moveConstructorItem: (state, action) => {
      const index = action.payload.index;
      const move = action.payload.move;

      if (move === 'up') {
        [state.ingredients[index], state.ingredients[index - 1]] = [
          state.ingredients[index - 1],
          state.ingredients[index]
        ];
      } else if (move === 'down') {
        [state.ingredients[index], state.ingredients[index + 1]] = [
          state.ingredients[index + 1],
          state.ingredients[index]
        ];
      }
    }
  }
});

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {
  addIngredient,
  deleteIngredient,
  removeConstructor,
  moveConstructorItem
} = burgerConstructorSlice.actions;

export const selectorBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;
