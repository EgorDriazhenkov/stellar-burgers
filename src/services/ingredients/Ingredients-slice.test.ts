import { ingredientsReducer } from './ingredients-slice';
import { getIngredientsThunk } from './ingredienst-actions';
import { testIngredients } from '../../mocks/test-data';

describe('ingredient-slice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  it('pending: включает loading и сбрасывает error', () => {
    const prevState = { ...initialState, error: 'Очень опасная и страшная ошибка' };

    const state = ingredientsReducer(
      prevState,
      getIngredientsThunk.pending('Номер заказа', undefined)
    );

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
    expect(state.ingredients).toEqual([]); 
  });

  it('fulfilled: сохраняет данные и выключает loading', () => {
    const prevState = { ingredients: [], loading: true, error: null };

    const state = ingredientsReducer(
      prevState,
      getIngredientsThunk.fulfilled(testIngredients, 'Номер заказа', undefined)
    );

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(testIngredients);
    expect(state.error).toBeNull();
  });

  it('rejected: сохраняет ошибку и выключает loading', () => {
    const prevState = { ingredients: [], loading: true, error: null };

    const state = ingredientsReducer(
      prevState,
      getIngredientsThunk.rejected(null, 'Номер заказа', undefined, 'Ошибка')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка');
    
    expect(state.ingredients).toEqual([]);
  });
})
