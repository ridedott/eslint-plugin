/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-require-imports */
import { ESLintUtils } from '@typescript-eslint/experimental-utils';
import { parse as parsePath } from 'path';

/**
 * This is not an import statement because it will make TSC copy the
 * package.json to the dist folder.
 */
const { version } = require('../package.json');

const REPO_URL = 'https://github.com/ridedott/eslint-config';

export const createRule = ESLintUtils.RuleCreator((name: string): string => {
  const ruleName = parsePath(name).name;

  return `${REPO_URL}/blob/v${version as string}/docs/rules/${ruleName}.md`;
});
