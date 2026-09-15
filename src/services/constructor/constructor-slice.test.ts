import {
  addIngredient,
  constructorReducer,
  swapIngredient,
  removeIngredient,
  clearBurger,
  initialState
} from './constructor-slice';
import {
  testBunOne,
  testBunTwo,
  testFilling,
  testSauce
} from '../../mocks/test-data';

describe('constructorSlice', () => {
  test('Добавление ингридиентов в бургер', () => {
    let state = constructorReducer(undefined, addIngredient(testBunOne));

    expect(state.burger.bun).toMatchObject({
      _id: testBunOne._id,
      name: testBunOne.name,
      type: 'bun'
    });

    state = constructorReducer(state, addIngredient(testBunTwo));

    expect(state.burger.bun).toMatchObject({
      _id: testBunTwo._id,
      name: testBunTwo.name,
      type: 'bun'
    });

    state = constructorReducer(state, addIngredient(testFilling));
    state = constructorReducer(state, addIngredient(testSauce));

    expect(state.burger.ingredients).toHaveLength(2);
    expect(state.burger.ingredients[0]).toMatchObject({
      _id: testFilling._id,
      name: testFilling.name,
      type: 'main'
    });
    expect(state.burger.ingredients[1]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      type: 'sauce'
    });
  });

  test('Поменять местами два ингридиента', () => {
    let state = constructorReducer(undefined, addIngredient(testFilling));
    state = constructorReducer(state, addIngredient(testSauce));

    expect(state.burger.ingredients).toHaveLength(2);
    expect(state.burger.ingredients[0]._id).toBe(testFilling._id);
    expect(state.burger.ingredients[1]._id).toBe(testSauce._id);

    state = constructorReducer(state, swapIngredient({ first: 0, second: 1 }));

    expect(state.burger.ingredients).toHaveLength(2);
    expect(state.burger.ingredients[0]._id).toBe(testSauce._id);
    expect(state.burger.ingredients[1]._id).toBe(testFilling._id);
  });

  test('Удаление ингридиента', () => {
    let state = constructorReducer(undefined, addIngredient(testFilling));
    state = constructorReducer(state, addIngredient(testSauce));

    expect(state.burger.ingredients).toHaveLength(2);

    const firstIngredientId = state.burger.ingredients[0].id;

    state = constructorReducer(state, removeIngredient(firstIngredientId));

    expect(state.burger.ingredients).toHaveLength(1);
    expect(state.burger.ingredients[0]).toMatchObject({
      _id: testSauce._id,
      name: testSauce.name,
      type: 'sauce'
    });
  });

  test('Очистка бургера', () => {
    let state = constructorReducer(undefined, addIngredient(testBunOne));
    state = constructorReducer(state, addIngredient(testFilling));
    state = constructorReducer(state, addIngredient(testSauce));

    expect(state.burger.bun).not.toBeNull();
    expect(state.burger.ingredients).toHaveLength(2);

    state = constructorReducer(state, clearBurger());

    expect(state.burger.bun).toBeNull();
    expect(state.burger.ingredients).toHaveLength(0);
  });

  test('Неизвестный action возвращает initialState', () => {
    const state = constructorReducer(undefined, { type: 'unknow' });
    expect(state).toEqual(initialState);
  });
});
