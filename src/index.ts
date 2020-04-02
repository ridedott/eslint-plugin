/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-require-imports */
import { readdirSync } from 'fs';
import { join, parse } from 'path';

const PREFIX = '@ridedott';
const rulesDirectory = join(__dirname, 'rules');
const { rules, allRules } = readdirSync(rulesDirectory).reduce(
  (
    parsed: {
      allRules: {};
      rules: {};
    },
    rule: string,
  ): {
    allRules: {};
    rules: {};
  } => {
    const { name } = parse(rule);

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
      plugins: [PREFIX],
      rules: allRules,
    },
    recommended: {
      plugins: [PREFIX],
      rules: {
        [`${PREFIX}/no-single-line-comment-block`]: 'warn',
        [`${PREFIX}/no-template-literals-without-expression`]: 'warn',
      },
    },
  },
  rules,
};
