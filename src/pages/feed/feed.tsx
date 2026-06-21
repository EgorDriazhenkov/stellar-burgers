import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  selectFeedOrders,
  selectOrdersLoading
} from '../../services/orders/orders-slice';
import { getFeedsThunk } from '../../services/orders/orders-actions';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFeedsThunk());
  }, [dispatch]);

  const orders: TOrder[] = useSelector(selectFeedOrders);
  const ordersLoading = useSelector(selectOrdersLoading);

  if (ordersLoading) {
    return <Preloader />;
  }

  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedsThunk())} />
  );
};
