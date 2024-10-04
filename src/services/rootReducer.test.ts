import { expect, test, describe } from '@jest/globals';
import { rootReducer } from './rootReducer';
import { initialState as constructorState } from './slices/burgerConstructorSlice/burgerConstructorSlice';
import { initialState as ingredientsState } from './slices/ingredientsSlice/ingredientsSlice';
import { initialState as userState } from './slices/userSlice/userSlice';
import { initialState as orderState } from './slices/orderSlice/orderSlice';
import { initialState as feedState } from './slices/feedSlice/feedSlice';

const initialState = {
  user: userState,
  burgerConstructor: constructorState,
  ingredients: ingredientsState,
  order: orderState,
  feed: feedState,
};

describe('Test rootReducer', () => {
  test('Test UNKNOWN_ACTION', () => {
    const action = { type: 'UNKNOWN_ACTION' };
    const newState = rootReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });
});
