import { test as base, expect } from '@playwright/test';

type TMockFixtures = {
  mockApi: void;
  authUser: void;
};

export const test = base.extend<TMockFixtures>({
  mockApi: async ({ page }, use) => {
    await page.routeFromHAR('./tests/hars/api.har', {
      url: '**/api/**',
      update: false
    });
    await use();
  },

  authUser: async ({ context }, use) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer accessToken',
        domain: 'localhost',
        path: '/'
      }
    ]);

    await context.addInitScript(() => {
      localStorage.setItem('refreshToken', 'test-refresh-token');
    });

    await use();
  }
});

test('Добавление ингридиентов', async ({ page, mockApi}) => {
  await page.goto('/');
  await expect(page.getByTestId('ingredients')).toBeVisible();

  const addIngredient = async (ingridientName: string) => {
    const ingredient = page
    .getByRole('listitem')
    .filter({ hasText: ingridientName });

    const ingredientAddButton = ingredient.getByRole('button');
    await ingredientAddButton.click();
  };

  await addIngredient('Краторная булка N-200i');
  await addIngredient('Говяжий метеорит (отбивная)'); 
  await addIngredient('Сыр с астероидной плесенью'); 
  await addIngredient('Соус традиционный галактический'); 

  const constructor = page.getByTestId('burgerConstructor')

  await expect(constructor.getByText('Краторная булка N-200i (верх)')).toBeVisible({ timeout: 15000 });
  await expect(constructor.getByText('Краторная булка N-200i (низ)')).toBeVisible({ timeout: 15000 });
  await expect(constructor.getByText('Говяжий метеорит (отбивная)')).toBeVisible({ timeout: 15000 });
  await expect(constructor.getByText('Сыр с астероидной плесенью')).toBeVisible({ timeout: 15000 });
  await expect(constructor.getByText('Соус традиционный галактический')).toBeVisible({ timeout: 15000 });

  const topBun = constructor.getByTestId('topBun')
  const bottomBun = constructor.getByTestId('bottomBun')
  const fillings = constructor.getByTestId('fillings')

  const allFillingItems = fillings.getByRole('listitem'); 
  await expect(allFillingItems).toHaveCount(3);
  await expect(topBun).toContainText('Краторная булка N-200i (верх)');
  await expect(bottomBun).toContainText('Краторная булка N-200i (низ)');
})

test.describe('Тестирование модального окна', () => {
  test('Открытие модального окна', async ({ page, mockApi}) => {
    await page.goto('/');
    await expect(page.getByTestId('ingredients')).toBeVisible();

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Флюоресцентная булка R2-D3' })
      .getByRole('link')
      .click();

    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('modal')).toContainText('Флюоресцентная булка R2-D3');
  })

  test('Закрытие модального окна', async ({ page, mockApi}) => {
    await page.goto('/');
    await expect(page.getByTestId('ingredients')).toBeVisible();

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Биокотлета из марсианской Магнолии' })
      .getByRole('link')
      .click();

    await expect(page.getByTestId('modal')).toBeVisible({ timeout: 15000 });
    await expect(page.getByTestId('modal')).toContainText('Биокотлета из марсианской Магнолии');
    
    await page
      .getByTestId('modal')
      .getByRole('button')
      .click();

    await expect(page.getByTestId('modal')).not.toBeVisible();
  })

  test('Закрытие модального окна по клику на оверлей', async ({ page, mockApi}) => {
    await page.goto('/');
    await expect(page.getByTestId('ingredients')).toBeVisible();

    await page
      .getByRole('listitem')
      .filter({ hasText: 'Филе Люминесцентного тетраодонтимформа' })
      .getByRole('link')
      .click();

    await expect(page.getByTestId('modal')).toBeVisible();
    await expect(page.getByTestId('modal')).toContainText('Филе Люминесцентного тетраодонтимформа');
    
    await page
      .getByTestId('modalOverlay')
      .click({ position: { x: 0, y: 0 } });

    await expect(page.getByTestId('modal')).not.toBeVisible();
  })
})
test('Создание и оформление заказа', async ({ page, mockApi, authUser}) => {

  await page.goto('/');
  await expect(page.getByTestId('ingredients')).toBeVisible();
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Флюоресцентная булка R2-D3' })
    .getByRole('button')
    .click();
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Филе Люминесцентного тетраодонтимформа' })
    .getByRole('button')
    .click();
  await page
    .getByRole('listitem')
    .filter({ hasText: 'Кристаллы марсианских альфа-сахаридов' })
    .getByRole('button')
    .click();
  const orderButton = page.getByRole('button', { name: 'Оформить заказ' });
  await expect(orderButton).toBeEnabled();   // 
  await orderButton.click();
 
  await expect(page.getByTestId('orderSuccess')).toBeVisible({ timeout: 1000 });
  await expect(page.getByTestId('orderSuccess')).toHaveText('110203');
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('orderSuccess')).not.toBeVisible();
  await expect(
    page.getByTestId('burger-constructor-element')
  ).not.toBeVisible();
})

