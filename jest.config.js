module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/main/$1',
    },
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
    testMatch: [
      '**/__tests__/**/*.test.[jt]s?(x)',
      '**/?(*.)+(spec|test).[jt]s?(x)',
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  