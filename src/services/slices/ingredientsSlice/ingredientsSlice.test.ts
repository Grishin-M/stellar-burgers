import { expect, test, describe } from '@jest/globals';
import { getIngredients } from './async';
import { initialState, ingredientsReducer } from './ingredientsSlice';
import { BUN_INGRIDIENT } from '@constants';

describe('Tests for ingredientsSlice', () => {
  const mockIngredients = [
    BUN_INGRIDIENT,
    {
      calories: 4242,
      carbohydrates: 242,
      fat: 142,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      name: 'Биокотлета из марсианской Магнолии',
      price: 424,
      proteins: 420,
      type: 'main',
      __v: 0,
      _id: '643d69a5c3f7b9001cfa0941'
    }
  ];

  test('getIngredients.pending', () => {
    const pendingState = {
      ...initialState,
      loading: true
    };

    const action = {
      type: getIngredients.pending.type,
      payload: mockIngredients
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(pendingState);
  });
  test('getIngredients.fulfilled', () => {
    const fulfilledState = {
      ...initialState,
      ingredients: mockIngredients,
      buns: [mockIngredients[0]],
      mains: [mockIngredients[1]],
      loading: false
    };

    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(fulfilledState);
  });
  test('getIngredients.rejected', () => {
    const errorMessage = {
      message: 'Something went wrong'
    };
    const rejectedState = {
      ...initialState,
      loading: false,
      error: 'Something went wrong',
    };
    const action = {
      type: getIngredients.rejected.type,
      error: errorMessage
    };
    const newState = ingredientsReducer(initialState, action);

    expect(newState).toEqual(rejectedState);
  });
});
