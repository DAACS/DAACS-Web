module.exports = {
    root: true,
    parserOptions: {
        ecmaVersion: 2017,
        sourceType: "module",
    },
    extends: "eslint:recommended",
    env: {
        browser: true,
    },
    parser: "babel-eslint",
    rules: {
        //@see http://eslint.org/docs/rules/no-var
        "no-var": "error",
        //@see http://eslint.org/docs/rules/object-shorthand
        "object-shorthand": "error",
        //@see http://eslint.org/docs/rules/prefer-template
        "prefer-template": "error",
    },
    globals: {
        window: true,
        d3: true,
        Modernizr: true,
        MathJax: true,
        Jodit: true,
        ace: true,
    },
};
