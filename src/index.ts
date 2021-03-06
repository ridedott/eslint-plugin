/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-var-requires */

import { readdirSync } from 'fs';
import { join, parse } from 'path';

const PREFIX = '@ridedott';
const rulesDirectory = join(__dirname, 'rules');
const { rules, allRules } = readdirSync(rulesDirectory).reduce(
  (
    parsed: {
      allRules: object;
      rules: object;
    },
    rule: string,
  ): {
    allRules: object;
    rules: object;
  } => {
    const { name, ext } = parse(rule);

    if (ext !== '.ts' && ext !== '.js') {
      return parsed;
    }

    return {
      ...parsed,
      allRules: {
        ...parsed.allRules,
        [`${PREFIX}/${name}`]: 'error',
      },
      rules: {
        ...parsed.rules,
        [name]: require(join(rulesDirectory, name)).default,
      },
    };
  },
  {
    allRules: {},
    rules: {},
  },
);

export = {
  configs: {
    all: {
      parser: '@typescript-eslint/parser',
      parserOptions: { sourceType: 'module' },
      plugins: [PREFIX],
      rules: allRules,
    },
    recommended: {
      parser: '@typescript-eslint/parser',
      parserOptions: { sourceType: 'module' },
      plugins: [PREFIX],
      rules: {
        [`${PREFIX}/no-single-line-comment-block`]: 'warn',
        [`${PREFIX}/no-template-literals-without-expression`]: 'warn',
      },
    },
  },
  rules,
};
