const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig');

const tsConfigPathsMap = pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' });

module.exports = {
    rootDir: 'src',
    transform: {
        '^.+\\.(j|t)sx?$': 'babel-jest'
    },
    // overriding `node` to have browser ApI mocked, like `window`.
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        // replace imports of non-JS assets
        '\\.(css|jpg)$': 'identity-obj-proxy',
        
        // resolve ambient imports with map defined in `tsconfig.json`.
        ...tsConfigPathsMap
    },
    setupFiles: ['<rootDir>/setup-tests.js'],
    setupFilesAfterEnv: ['../node_modules/@testing-library/jest-dom/dist/index.js'],
    modulePathIgnorePatterns: ['<rootDir>/environments']
};