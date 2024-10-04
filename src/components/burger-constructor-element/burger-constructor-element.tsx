import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import {
  deleteIngredient,
  moveConstructorItem
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import { useDispatch } from '../../services/store';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveDown = () => {
      dispatch(moveConstructorItem({ index: index, move: 'down' }));
    };

    const handleMoveUp = () => {
      dispatch(moveConstructorItem({ index: index, move: 'up' }));
    };

    const handleDelete = () => {
      dispatch(deleteIngredient(ingredient));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleDelete}
      />
    );
  }
);
