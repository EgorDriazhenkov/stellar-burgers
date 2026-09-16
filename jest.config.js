module.exports = {
  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },

  moduleNameMapper: {
    '^@pages$': '<rootDir>/src/pages',
    '^@pages/(.*)$': '<rootDir>/src/pages/$1',

    '^@components$': '<rootDir>/src/components',
    '^@components/(.*)$': '<rootDir>/src/components/$1',

    '^@ui$': '<rootDir>/src/components/ui',
    '^@ui/(.*)$': '<rootDir>/src/components/ui/$1',

    '^@ui-pages$': '<rootDir>/src/components/ui/pages',
    '^@ui-pages/(.*)$': '<rootDir>/src/components/ui/pages/$1',

    '^@utils-types$': '<rootDir>/src/utils/types',
    '^@utils-types/(.*)$': '<rootDir>/src/utils/types/$1',

    '^@api$': '<rootDir>/src/utils/burger-api.ts',

    '^@slices$': '<rootDir>/src/services/slices',
    '^@slices/(.*)$': '<rootDir>/src/services/slices/$1',

    '^@selectors$': '<rootDir>/src/services/selectors',
    '^@selectors/(.*)$': '<rootDir>/src/services/selectors/$1',

    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },

  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/',
    '\\.spec\\.ts$'
  ],

  testMatch: ['**/*.test.[jt]s?(x)'],

  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8'
};
