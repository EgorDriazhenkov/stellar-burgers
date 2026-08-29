import { FC, useMemo, useEffect } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectNewOrder,
  selectOrderRequest,
  setNewOrder,
  selectOrderSuccess,
  resetOrderSuccess
} from '../../services/orders/orders-slice';
import {
  clearBurger,
  selectBurgerConstructor
} from '../../services/constructor/constructor-slice';
import { selectUser } from '../../services/user/user-slice';
import { useLocation, useNavigate } from 'react-router-dom';
import { postUserBurgerThunk } from '../../services/orders/orders-actions';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectUser);
  const constructorItems = useSelector(selectBurgerConstructor);
  const orderRequest = useSelector(selectOrderRequest);

  const orderModalData = useSelector(selectNewOrder).order;

  const orderSuccess = useSelector(selectOrderSuccess);
  useEffect(() => {
    if (orderSuccess) {
      dispatch(clearBurger());
      dispatch(resetOrderSuccess());
    }
  }, [orderSuccess, dispatch]);

  const onOrderClick = () => {
    if (!user) {
      navigate('/login', {
        replace: true,
        state: {
          from: {
            ...location,
            background: location.state?.background,
            state: null
          }
        }
      });
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredients = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((item) => item._id),
      constructorItems.bun._id
    ];

    dispatch(postUserBurgerThunk(ingredients));
  };

  const closeOrderModal = () => {
    dispatch(setNewOrder(false));
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
