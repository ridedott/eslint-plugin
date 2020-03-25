/* eslint-disable new-cap */
import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { parse as parsePath } from 'path';

import { version } from '../package.json';

const REPO_URL = 'https://github.com/ridedott/eslint-config';

export const createRule = ESLintUtils.RuleCreator((name: string): string => {
  const ruleName = parsePath(name).name;

  return `${REPO_URL}/blob/v${version}/docs/rules/${ruleName}.md`;
});
