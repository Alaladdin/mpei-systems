module.exports = {
  env: {
    commonjs: true,
    es2021  : true,
    node    : true,
  },
  globals: {
    eventEmitter: true,
  },
  extends      : ['airbnb-base'],
  parserOptions: { ecmaVersion: 12 },
  rules        : {
    'consistent-return'               : ['warn'],
    curly                             : ['error', 'multi-or-nest', 'consistent'],
    'no-underscore-dangle'            : 0,
    'no-console'                      : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger'                     : process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'nonblock-statement-body-position': ['error', 'any'],
    'linebreak-style'                 : ['warn', 'windows'],
    'object-curly-newline'            : ['error', {
      ObjectExpression : { minProperties: 10, multiline: true, consistent: true },
      ObjectPattern    : { minProperties: 10, multiline: true, consistent: true },
      ImportDeclaration: { minProperties: 10, multiline: true, consistent: true },
      ExportDeclaration: { minProperties: 10, multiline: true, consistent: true },
    }],
    'max-len'    : ['error', 120],
    'key-spacing': ['error', {
      singleLine: {
        beforeColon: false,
        afterColon : true,
      },
      multiLine: { align: 'colon' },
    }],
    'comma-dangle': ['error', {
      arrays   : 'always-multiline',
      objects  : 'always-multiline',
      imports  : 'never',
      exports  : 'never',
      functions: 'never',
    }],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev     : '*',
        next     : 'return',
      },
      {
        blankLine: 'always',
        prev     : ['const', 'let'],
        next     : '*',
      },
      {
        blankLine: 'any',
        prev     : ['const', 'let'],
        next     : ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev     : ['if', 'case', 'default'],
        next     : '*',
      },
      {
        blankLine: 'always',
        prev     : '*',
        next     : ['if', 'case', 'default'],
      },
      {
        blankLine: 'any',
        prev     : ['if', 'case', 'default'],
        next     : ['if', 'case', 'default'],
      },
    ],
  },
};
