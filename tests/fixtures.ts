import { test as base } from '@playwright/test';

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

export { expect } from '@playwright/test';
