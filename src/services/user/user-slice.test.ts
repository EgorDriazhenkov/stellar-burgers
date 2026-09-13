import { userReducer, setUser, initialState } from './user-slice';
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  logoutUserThunk,
  setIsAuthChecked
} from './user-actions';
import {
  testUser,
  testAuthResponse,
  testUserResponse,
  testRegisterData,
  testLoginData
} from '../../mocks/test-data';

jest.mock('../../utils/cookie', () => ({
  ...jest.requireActual('../../utils/cookie'),
  setCookie: jest.fn()
}));

describe('userSlice', () => {

  test('setUser: сохраняет пользователя', () => {
    const state = userReducer(initialState, setUser(testUser));
    expect(state.user).toEqual(testUser);
  });
 test('setIsAuthChecked: меняет значение isAuthChecked', () => {
    const state = userReducer(initialState, setIsAuthChecked(true));
    expect(state.isAuthChecked).toBe(true);
  });

  test('registerUserThunk.fulfilled: сохраняет user и выставляет isAuthChecked', () => {
    const state = userReducer(
      { ...initialState, loading: true },
      registerUserThunk.fulfilled(testAuthResponse, 'id', testRegisterData)
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(testUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('registerUserThunk.rejected: пишет error, loading=false', () => {
    const state = userReducer(
      { ...initialState, loading: true },
      registerUserThunk.rejected(null, 'id', testRegisterData, 'Email занят')
    );

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Email занят');
  });

  // loginUserThunk
  it('loginUserThunk.fulfilled: сохраняет user и выставляет isAuthChecked', () => {
    const state = userReducer(
      { ...initialState, loading: true },
      loginUserThunk.fulfilled(testAuthResponse, 'id', testLoginData)
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(testUser);
    expect(state.isAuthChecked).toBe(true);
  });

  it('loginUserThunk.rejected: ошибка', () => {
    const state = userReducer(
      { ...initialState, loading: true },
      loginUserThunk.rejected(null, 'id', testLoginData, 'Неверный пароль')
    );

    expect(state.error).toBe('Неверный пароль');
  });

  it('updateUserThunk.fulfilled: обновляет user', () => {
    const state = userReducer(
      { ...initialState, loading: true, user: { email: 'old', name: 'Old' } },
      updateUserThunk.fulfilled(testUserResponse, 'id', { name: 'New Name' })
    );

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(testUser);
  });

  it('updateUserThunk.rejected: пишет error', () => {
    const state = userReducer(
      { ...initialState, loading: true },
      updateUserThunk.rejected(null, 'id', {}, 'Ошибка обновления')
    );

    expect(state.error).toBe('Ошибка обновления');
  });

it('logoutUserThunk.fulfilled: сбрасывает user', () => {
  const state = userReducer(
    { ...initialState, loading: true, user: testUser, isAuthChecked: true },
    logoutUserThunk.fulfilled({ success: true }, 'id', undefined)  
  );

  expect(state.loading).toBe(false);
  expect(state.user).toBeNull();
});

  it('logoutUserThunk.rejected: ошибка', () => {
    const state = userReducer(
      { ...initialState, loading: true },
      logoutUserThunk.rejected(null, 'id', undefined, 'Ошибка')
    );

    expect(state.error).toBe('Ошибка');
  });
});
