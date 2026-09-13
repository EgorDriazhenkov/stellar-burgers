import {
  ordersReducer,
  initialState,
  setNewOrder,
  resetOrderSuccess
} from './orders-slice';
import {
  getFeedsThunk,
  getOrderByNumberThunk,
  postUserBurgerThunk,
  getUserOrdersThunk
} from './orders-actions';
import {
  testFeeds,
  testOrderResponse,
  testNewOrderResponse,
  testUserOrders
} from '../../mocks/test-data';

describe('ordersSlice', () => {
  const ids = ['a', 'b', 'c'];

  test('setNewOrder: ставит orderRequest и сбрасывает newOrder.order', () => {
    const state = ordersReducer(
      { ...initialState, newOrder: { order: { _id: '1' } as any, name: 'X' } },
      setNewOrder(true)
    );
    expect(state.orderRequest).toBe(true);
    expect(state.newOrder.order).toBeNull();
  });

  test('resetOrderSuccess: сбрасывает orderSuccess', () => {
    const state = ordersReducer(
      { ...initialState, orderSuccess: true },
      resetOrderSuccess()
    );
    expect(state.orderSuccess).toBe(false);
  });

  test('getFeedsThunk.fulfilled: сохраняет feed и снимает loading', () => {
    const state = ordersReducer(
      { ...initialState, loading: true },
      getFeedsThunk.fulfilled(testFeeds, 'id', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.feed).toEqual(testFeeds);
  });

  test('getOrderByNumberThunk.fulfilled: берёт заказ из orders[0]', () => {
    const state = ordersReducer(
      { ...initialState, loading: true },
      getOrderByNumberThunk.fulfilled(testOrderResponse, 'id', 42)
    );
    expect(state.loading).toBe(false);
    expect(state.orderByNumber).toEqual(testOrderResponse.orders[0]);
  });

  test('postUserBurgerThunk.fulfilled: сохраняет newOrder и поднимает orderSuccess', () => {
    const state = ordersReducer(
      { ...initialState, loading: true, orderRequest: true },
      postUserBurgerThunk.fulfilled(testNewOrderResponse, 'id', ids)
    );
    expect(state.loading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.orderSuccess).toBe(true);
    expect(state.newOrder.name).toBe(testNewOrderResponse.name);
  });

  test('getUserOrdersThunk.fulfilled: сохраняет userOrders', () => {
    const state = ordersReducer(
      { ...initialState, loading: true },
      getUserOrdersThunk.fulfilled(testUserOrders, 'id', undefined)
    );
    expect(state.loading).toBe(false);
    expect(state.userOrders).toEqual(testUserOrders);
  });

  test('rejected любого thunk: снимает loading и пишет error', () => {
    const state = ordersReducer(
      { ...initialState, loading: true },
      getFeedsThunk.rejected(null, 'id', undefined, 'Ошибка')
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
  });
});
