import { TIngredient, TOrder, TUser } from '@utils-types';
import {
  TFeedsResponse,
  TOrderResponse,
  TNewOrderResponse,
  TAuthResponse,
  TUserResponse
} from '@api';

export const testBunOne: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093d',
  name: 'Флюоресцентная булка R2-D3',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};

export const testBunTwo: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const testFilling: TIngredient = {
  _id: '643d69a5c3f7b9001cfa093f',
  name: 'Мясо бессмертных моллюсков Protostomia',
  type: 'main',
  proteins: 433,
  fat: 244,
  carbohydrates: 33,
  calories: 420,
  price: 1337,
  image: 'https://code.s3.yandex.net/react/code/meat-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-02-large.png'
};

export const testSauce: TIngredient = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

export const testIngredients = [testBunOne, testFilling, testSauce];

export const testFeeds: TFeedsResponse = {
  success: true,
  orders: [
    {
      _id: '6a33c10a6a172d001b98cfe4',
      status: 'done',
      name: 'Минеральный био-марсианский краторный бургер',
      createdAt: '2026-09-11T09:57:30.363Z',
      updatedAt: '2026-09-11T09:57:30.436Z',
      number: 106657,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093c'
      ]
    },
    {
      _id: '6a33c10a6a172d001b98cfe5',
      status: 'pending',
      name: 'Био-марсианский бургер',
      createdAt: '2026-09-11T10:15:00.000Z',
      updatedAt: '2026-09-11T10:15:00.000Z',
      number: 106658,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ]
    }
  ],
  total: 2000,
  totalToday: 50
};

export const testOrderResponse: TOrderResponse = {
  success: true,
  orders: [
    {
      _id: '6a33c10a6a172d001b98cfe4',
      status: 'done',
      name: 'Минеральный био-марсианский краторный бургер',
      createdAt: '2026-09-11T09:57:30.363Z',
      updatedAt: '2026-09-11T09:57:30.436Z',
      number: 106657,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa093c'
      ]
    },
    {
      _id: '6a33c10a6a172d001b98cfe5',
      status: 'pending',
      name: 'Био-марсианский бургер',
      createdAt: '2026-09-11T10:15:00.000Z',
      updatedAt: '2026-09-11T10:15:00.000Z',
      number: 106658,
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093c'
      ]
    }
  ]
};

export const testNewOrderResponse: TNewOrderResponse = {
  success: true,
  name: 'Минеральный био-марсианский краторный бургер',
  order: {
    _id: '6a33c10a6a172d001b98cfe4',
    status: 'done',
    name: 'Минеральный био-марсианский краторный бургер',
    createdAt: '2026-09-11T09:57:30.363Z',
    updatedAt: '2026-09-11T09:57:30.436Z',
    number: 106657,
    price: 3234,
    owner: {
      name: 'Jonh Doe',
      email: 'user@exampl.com',
      createdAt: '2026-09-04T06:30:47.300Z',
      updatedAt: '2026-09-05T07:21:51.331Z'
    }
  }
};

export const testUserOrders: TOrder[] = [
  {
    _id: '6a33c10a6a172d001b98cfe4',
    status: 'done',
    name: 'Минеральный био-марсианский краторный бургер',
    createdAt: '2026-09-18T09:57:30.363Z',
    updatedAt: '2026-06-18T09:57:30.436Z',
    number: 106657,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa093c'
    ]
  },
  {
    _id: '6a33c10a6a172d001b98cfe5',
    status: 'pending',
    name: 'Био-марсианский бургер',
    createdAt: '2026-09-18T10:15:00.000Z',
    updatedAt: '2026-09-18T10:15:00.000Z',
    number: 106658,
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ]
  }
];

export const testUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

export const testLoginData = {
  email: 'test@example.com',
  password: 'password123'
};

export const testRegisterData = {
  email: 'test@example.com',
  password: 'password123',
  name: 'Test User'
};

export const testAuthResponse: TAuthResponse = {
  success: true,
  accessToken: 'test-access-token',
  refreshToken: 'test-refresh-token',
  user: testUser
};

export const testUserResponse: TUserResponse = {
  success: true,
  user: testUser
};
