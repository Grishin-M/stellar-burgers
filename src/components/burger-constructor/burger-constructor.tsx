import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../services/slices/userSlice/userSlice';
import {
  selectorBurgerConstructor,
  removeConstructor
} from '../../services/slices/burgerConstructorSlice/burgerConstructorSlice';
import {
  selectOrder,
  deleteOrder,
  selectOrderLoading
} from '../../services/slices/orderSlice/orderSlice';
import { newOrder } from '../../../src/services/slices/orderSlice/async';

export const BurgerConstructor: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const constructorItems = useSelector(selectorBurgerConstructor);
  const orderRequest = useSelector(selectOrderLoading);
  const orderModalData = useSelector(selectOrder);

  const closeOrderModal = () => {
    dispatch(removeConstructor());
    dispatch(deleteOrder());
  };

  const onOrderClick = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;

    const itemId = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];
    dispatch(newOrder(itemId));
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
