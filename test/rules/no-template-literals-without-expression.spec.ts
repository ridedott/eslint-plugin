/* eslint-disable no-template-curly-in-string */
/* eslint-disable unicorn/filename-case */
import { TSESLint } from '@typescript-eslint/experimental-utils';

import rule from '../../src/rules/no-template-literals-without-expression';

const ruleTester = new TSESLint.RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-template-literals-without-expression', rule, {
  invalid: [
    {
      code: '`Single line template literal without expressions`',
      errors: [
        {
          column: 1,
          endColumn: 51,
          messageId: 'templateLiteralsShouldHaveExpression',
        },
      ],
      output: "'Single line template literal without expressions'",
    },
    {
      code:
        "`Single line template literal without expressions with 'single quotes'`",
      errors: [
        {
          column: 1,
          endColumn: 72,
          messageId: 'templateLiteralsShouldHaveExpression',
        },
      ],
      output:
        '"Single line template literal without expressions with \'single quotes\'"',
    },
    {
      code: '`Multiline template literal\nwithout expressions`',
      errors: [
        {
          column: 1,
          endColumn: 21,
          messageId: 'templateLiteralsShouldHaveExpression',
        },
      ],
    },
  ],
  valid: [
    '`Single line template literal with ${expression}`',
    '`Single line template literal with \'", ${expression}\'"`',
    '`Multiline template literal\nwith ${expression}`',
    '`Single line template literal without expressions, \'single quotes\', "double quotes"`',
    {
      code: '`Multiline template literal\nwithout expressions`',
      options: [{ ignoreMultiline: true }],
    },
  ],
});
