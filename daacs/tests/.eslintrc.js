module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 7,
      sourceType: 'module'
    },
    parser: 'babel-eslint',
    extends: 'eslint:recommended',
    env: {
      'browser': true
    },
    rules: {
        //@see http://eslint.org/docs/rules/no-var
        "no-var": "error",
        //@see http://eslint.org/docs/rules/object-shorthand
        "object-shorthand": "error",
        //@see http://eslint.org/docs/rules/prefer-template
        "prefer-template": "error"
    },
    globals: {
        "window": true,
        'd3': true
    }
};
