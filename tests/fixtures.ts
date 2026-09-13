import { test as base } from '@playwright/test';

type TMockFixtures = {
  mockApi: void;
  mockUser: void;
  mockToken: void;
  mockOrder: void;
};


export const test = base.extend<TMockFixtures>({
  mockApi: async ({ page }, use) => {
    await page.routeFromHAR('./tests/hars/api.har', {
      url: '**/api/**',
      update: false
    });
    await use();
  },

  mockUser: async ({ page }, use) => {
    await page.route('**/api/auth/user', async (route) => {
      const headers = await route.request().allHeaders();
      const authHeader = headers['authorization'];

      if (authHeader === 'Bearer accessToken') {
        await route.fulfill({
          status: 200,
          json: { success: true, user: { email: 'user@example.com', name: 'John Doe'} },
        });
      } else {
        await route.fulfill({
          status: 401,
          json: { success: false, message: 'Вы должны быть авторизованы' },
        });
      }
    });
    await use();
  },

  mockToken: async ({ context }, use) => {
    await context.addCookies([
      {
        name: 'accessToken',
        value: 'Bearer accessToken',
        domain: 'localhost',
        path: '/',
      },
    ]);
    await use();
  },
  mockOrder: async ({ page }, use) => {
    await page.route('**/api/orders', async (route) => {
    
    const request = route.request();
    if (request.method() === 'POST') {
      
      await route.fulfill({
        status: 200,
        json: {
          success: true,
          order: {
            number: 4815162342, 
          },
        },
      });
    } else {
      
      await route.continue();
    }
  });
  await use();
  }

});

export { expect } from '@playwright/test';
