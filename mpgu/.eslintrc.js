module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/essential',
        '@vue/airbnb',
    ],
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'nonblock-statement-body-position': ['off', 'any'],
        'no-param-reassign': ['error', { 'props': false }],
        'arrow-parens': ['error', 'as-needed'],
        'indent-legacy': ['error', 4, { SwitchCase: 1 }],
        'indent': 0,
        'max-len': 0,
        'curly': 0,
        'no-alert': 0,
        'no-plusplus': 0,
        'linebreak-style': 0,
        'no-return-assign': 0,
        'implicit-arrow-linebreak': 0,
        'no-underscore-dangle': 0,
        'import/prefer-default-export': 0,
        'consistent-return': 0,
        'no-empty': 0,
    },
    parserOptions: {
        parser: 'babel-eslint',
    },
};
