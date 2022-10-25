'use strict';

module.exports = {
  printWidth: 100,
  singleQuote: true,
  arrowParens: 'avoid',
  trailingComma: 'es5',
  bracketSpacing: true,
  overrides: [
    {
      files: ['**/*.hbs'],
      options: {
        singleQuote: false,
        printWidth: 80,
      },
    },
  ],
};
