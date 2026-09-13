import * as api from '@api';
import {
  getFeedsThunk,
  getOrderByNumberThunk,
  postUserBurgerThunk,
  getUserOrdersThunk
} from './orders-actions';

import { testFeeds, testOrderResponse, testNewOrderResponse, testUserOrders } from '../../mocks/test-data';



describe('orders-actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const runThunk = async (thunk: any) => {
    const dispatch = jest.fn();
    await thunk(dispatch, () => ({}), undefined);
    return dispatch;
  };

describe('getFeedsThunk', () => {
  test('Успешный запрос', async () => {
    jest.spyOn(api, 'getFeedsApi').mockResolvedValue(testFeeds);

    const dispatch = await runThunk(getFeedsThunk());

    expect(api.getFeedsApi).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: getFeedsThunk.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getFeedsThunk.fulfilled.type,
        payload: testFeeds
      })
      );
    });

    test('Запрос с ошибкой', async () => {
      jest.spyOn(api, 'getFeedsApi').mockRejectedValue(new Error('Ошибка при получении ингредиентов'));

      const dispatch = await runThunk(getFeedsThunk());

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: getFeedsThunk.rejected.type,
          payload: 'Ошибка при получении ингредиентов'
        })
      );
    });
})

describe('getOrderByNumberThunk', () => {
  it('Успешный запрос', async () => {
    const spy = jest
      .spyOn(api, 'getOrderByNumberApi')
      .mockResolvedValue(testOrderResponse);

  const dispatch = await runThunk(getOrderByNumberThunk(106657));

    expect(spy).toHaveBeenCalledWith(106657);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getOrderByNumberThunk.fulfilled.type,
        payload: testOrderResponse
      })
    );
  });

  it('Запрос с ошибкой', async () => {
    jest
      .spyOn(api, 'getOrderByNumberApi')
      .mockRejectedValue(new Error('Заказ не найден'));

    const dispatch = await runThunk(getOrderByNumberThunk(999));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getOrderByNumberThunk.rejected.type,
        payload: 'Заказ не найден'
      })
    );
  });
});
 describe('postUserBurgerThunk', () => {
    it('Успешная передача заказа', async () => {
      const spy = jest.spyOn(api, 'orderBurgerApi').mockResolvedValue(testNewOrderResponse);
      const ids = ['a', 'b', 'c'];
      const dispatch = await runThunk(postUserBurgerThunk(ids));

      expect(spy).toHaveBeenCalledWith(ids);
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: postUserBurgerThunk.fulfilled.type,
          payload: testNewOrderResponse
        })
      );
    });

    it('Ошибка в передаче заказа', async () => {
      jest.spyOn(api, 'orderBurgerApi').mockRejectedValue(new Error('Ошибка в передаче заказа'));
      const dispatch = await runThunk(postUserBurgerThunk(['a']));
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: postUserBurgerThunk.rejected.type,
          payload: 'Ошибка в передаче заказа'
        })
      );
    });
  });

  describe('getUserOrdersThunk', () => {
    it('Успешный запрос', async () => {
      jest.spyOn(api, 'getOrdersApi').mockResolvedValue(testUserOrders);
      const dispatch = await runThunk(getUserOrdersThunk());
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: getUserOrdersThunk.fulfilled.type,
          payload: testUserOrders
        })
      );
    });

    it('Запрос с ошибкой', async () => {
      jest.spyOn(api, 'getOrdersApi').mockRejectedValue(new Error('Ошибка в получении заказов пользователя'));
      const dispatch = await runThunk(getUserOrdersThunk());
      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: getUserOrdersThunk.rejected.type,
          payload: 'Ошибка в получении заказов пользователя'
        })
      );
    });

})
})
