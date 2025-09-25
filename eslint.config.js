// eslint.config.js

import eslint from '@eslint/js';

import globals from 'globals';

import _nextPlugin from '@next/eslint-plugin-next';

export default [
    // 1. ESLint's recommended rules for general JavaScript

    eslint.configs.recommended, // 2. Configuration for specific files (e.g., .js)

    {
        files: ['**/*.js', '**/*.jsx'],

        languageOptions: {
            // Define environments, e.g., browser and Node.js

            globals: {
                ...globals.browser,

                ...globals.node, // Add other global variables your code uses (e.g., 'process')
            },

            parserOptions: {
                ecmaVersion: 2022,

                sourceType: 'module',

                ecmaFeatures: {
                    jsx: true, // If using React
                },
            },
        },

        plugins: {
            '@next/next': _nextPlugin, // Use the new name here
        },

        rules: {
            // Add any custom rules here, e.g.:

            semi: ['error', 'always'],

            indent: ['error', 4],

            ..._nextPlugin.configs.recommended.rules,
            ..._nextPlugin.configs['core-web-vitals'].rules,
            '@next/next/google-font-display': 'warn',
        },
    },
];
