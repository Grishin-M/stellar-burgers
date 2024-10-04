import { expect, test, describe } from '@jest/globals';
import {
  initialState,
  burgerConstructorReducer,
  addIngredient,
  deleteIngredient,
  moveConstructorItem
} from './burgerConstructorSlice';
import { v4 as uuidv4 } from 'uuid';

const initialIngredients = [
  {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    name: 'Филе Люминесцентного тетраодонтимформа',
    price: 988,
    proteins: 44,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa093e',
    id: '1'
  },
  {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    name: 'Соус фирменный Space Sauce',
    price: 80,
    proteins: 50,
    type: 'sauce',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa0943',
    id: '2'
  }
];

const newIngredient = {
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
  _id: '643d69a5c3f7b9001cfa0941',
  id: '3'
};

jest.mock('uuid', () => ({ v4: () => '3' }));

describe('Tests for burgerConstructorSlice', () => {
  const constructorState = {
    ...initialState,
    ingredients: initialIngredients
  };

  test('Test add ingridient', () => {
    const newState = burgerConstructorReducer(
      constructorState,
      addIngredient(newIngredient)
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([...initialIngredients, newIngredient]);
  });

  test('Test delete ingridient', () => {
    const newState = burgerConstructorReducer(
      constructorState,
      deleteIngredient(initialIngredients[1])
    );

    const { ingredients } = newState;

    expect(ingredients).toEqual([initialIngredients[0]]);
  });

  test('Test switch ingridient', () => {
    let newState = burgerConstructorReducer(
      constructorState,
      moveConstructorItem({ index: 1, move: 'up' })
    );
    const { ingredients } = newState;

    expect(ingredients).toEqual([initialIngredients[1], initialIngredients[0]]);
  });
});
