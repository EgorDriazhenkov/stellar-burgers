import { testIngredients } from '../../mocks/test-data';
import { getIngredientsThunk } from './ingredienst-actions';
import * as api from '@api';

describe('getIngredientsThunk', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const runThunk = async () => {
    const dispatch = jest.fn();
    const thunk = getIngredientsThunk();
    await thunk(dispatch, () => ({}), undefined);
    return dispatch;
  };

  test('Успешный запрос', async () => {
    jest.spyOn(api, 'getIngredientsApi').mockResolvedValue(testIngredients);

    const dispatch = await runThunk();

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: getIngredientsThunk.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getIngredientsThunk.fulfilled.type,
        payload: testIngredients
      })
    );
  });

  test('Запрос с ошибкой', async () => {
    jest
      .spyOn(api, 'getIngredientsApi')
      .mockRejectedValue(new Error('Ошибка запроса данных'));

    const dispatch = await runThunk();

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: getIngredientsThunk.pending.type })
    );
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: getIngredientsThunk.rejected.type,
        payload: 'Ошибка запроса данных'
      })
    );
  });
});
