import * as api from '@api';
import {
  registerUserThunk,
  loginUserThunk,
  updateUserThunk,
  logoutUserThunk,
  checkUserAuth
} from './user-actions';
import {
  testUser,
  testLoginData,
  testRegisterData,
  testAuthResponse,
  testUserResponse
} from '../../mocks/test-data';
import { setUser } from './user-slice';
import * as cookie from '../../utils/cookie';

describe('user-actions', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  const runThunk = async (thunk: any) => {
    const dispatch = jest.fn();
    await thunk(dispatch, () => ({}), undefined);
    return dispatch;
  };

  it('registerUserThunk: успех', async () => {
    const spy = jest
      .spyOn(api, 'registerUserApi')
      .mockResolvedValue(testAuthResponse);

    const dispatch = await runThunk(registerUserThunk(testRegisterData));

    expect(spy).toHaveBeenCalledWith(testRegisterData);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: registerUserThunk.fulfilled.type,
        payload: testAuthResponse
      })
    );
  });

  it('registerUserThunk: ошибка', async () => {
    jest
      .spyOn(api, 'registerUserApi')
      .mockRejectedValue(new Error('Email занят'));

    const dispatch = await runThunk(registerUserThunk(testRegisterData));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: registerUserThunk.rejected.type,
        payload: 'Email занят'
      })
    );
  });

  it('loginUserThunk: успех - передаёт loginData, возвращает user', async () => {
    const spy = jest
      .spyOn(api, 'loginUserApi')
      .mockResolvedValue(testAuthResponse);

    const dispatch = await runThunk(loginUserThunk(testLoginData));

    expect(spy).toHaveBeenCalledWith(testLoginData);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: loginUserThunk.fulfilled.type,
        payload: testAuthResponse
      })
    );
  });

  it('loginUserThunk: ошибка', async () => {
    jest
      .spyOn(api, 'loginUserApi')
      .mockRejectedValue(new Error('Неверный пароль'));

    const dispatch = await runThunk(loginUserThunk(testLoginData));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: loginUserThunk.rejected.type,
        payload: 'Неверный пароль'
      })
    );
  });

  it('updateUserThunk: успех - передаёт partial-данные', async () => {
    const partial = { name: 'New Name' };
    const spy = jest
      .spyOn(api, 'updateUserApi')
      .mockResolvedValue(testUserResponse);

    const dispatch = await runThunk(updateUserThunk(partial));

    expect(spy).toHaveBeenCalledWith(partial);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: updateUserThunk.fulfilled.type })
    );
  });

  it('updateUserThunk: ошибка', async () => {
    jest
      .spyOn(api, 'updateUserApi')
      .mockRejectedValue(new Error('Не удалось обновить'));

    const dispatch = await runThunk(updateUserThunk({ name: 'X' }));

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: updateUserThunk.rejected.type,
        payload: 'Не удалось обновить'
      })
    );
  });

  it('logoutUserThunk: успех - вызывает logoutApi', async () => {
    const spy = jest
      .spyOn(api, 'logoutApi')
      .mockResolvedValue({ success: true });

    const dispatch = await runThunk(logoutUserThunk());

    expect(spy).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({ type: logoutUserThunk.fulfilled.type })
    );
  });

  it('logoutUserThunk: ошибка', async () => {
    jest.spyOn(api, 'logoutApi').mockRejectedValue(new Error('Ошибка'));

    const dispatch = await runThunk(logoutUserThunk());

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: logoutUserThunk.rejected.type,
        payload: 'Ошибка'
      })
    );
  });

  it('checkUserAuth: с токеном - получает user и dispatch(setUser)', async () => {
    jest.spyOn(cookie, 'getCookie').mockReturnValue('token-123');
    jest
      .spyOn(api, 'getUserApi')
      .mockResolvedValue({ success: true, user: testUser });

    const dispatch = jest.fn();
    await checkUserAuth()(dispatch, () => ({}), undefined);
    await new Promise((r) => setTimeout(r, 0));

    expect(dispatch).toHaveBeenCalledWith(setUser(testUser));
  });
});
