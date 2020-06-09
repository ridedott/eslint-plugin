/* eslint-disable unicorn/filename-case */
import { TSESLint } from '@typescript-eslint/experimental-utils';

import rule from '../../src/rules/no-single-line-comment-block';

const ruleTester = new TSESLint.RuleTester();

ruleTester.run('no-single-line-comment-block', rule, {
  invalid: [
    {
      code: '/*\n* Only one line in this block\n*/',
      errors: [
        {
          column: 1,
          endColumn: 3,
          messageId: 'useSingleLineNotation',
        },
      ],
    },
    {
      code: '/* Only one line in this block (single line) */',
      errors: [
        {
          column: 1,
          endColumn: 48,
          messageId: 'useSingleLineNotation',
        },
      ],
    },
    {
      code: '/* cspell:ignore this */',
      errors: [
        {
          column: 1,
          endColumn: 25,
          messageId: 'useSingleLineNotation',
        },
      ],
    },
    {
      code: '/* should fail as it ends with cspell:ignore this */',
      errors: [
        {
          column: 1,
          endColumn: 53,
          messageId: 'useSingleLineNotation',
        },
      ],
      options: [{ ignore: ['cspell'], ignorePatterns: ['(?:RegExp)(?: |)$'] }],
    },
  ],
  valid: [
    '/*\n* Two lines\n* in this block\n*/',
    '/**\n* One line JSDoc block\n*/',
    '/* eslint-disable no-warning-comments */',
    '/* eslint-enable no-warning-comments */',
    '/* eslint-disable-next-line no-warning-comments */',
    '/* eslint-enable-next-line no-warning-comments */',
    '/* global var1, var2 */',
    '/* eslint-env node */',
    '/* c8 ignore next */',
    '/* c8 ignore next 4 */',
    '/* istanbul ignore next */',
    '/* istanbul ignore if */',
    '/* istanbul ignore else */',
    '// Only one line in comment notation',
    {
      code: '/* cspell:ignore this */',
      options: [{ ignore: ['cspell'], ignorePatterns: [] }],
    },
    {
      code: '/* custom RegExp */',
      options: [{ ignore: [], ignorePatterns: ['(?:RegExp)(?: |)$'] }],
    },
  ],
});
