/* eslint-disable @typescript-eslint/no-require-imports */
import { exists } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';

import internalRules = require('../src');

const existsAsync = promisify(exists);
const ruleNames = Object.keys(internalRules.rules);
const numberOfRules = 1;

const allConfigRules = Object.values(internalRules.configs)
  .map(
    (config: {
      plugins: string[];
      rules: { [key: string]: string };
    }): string[] => Object.keys(config.rules),
  )
  .reduce(
    (previousValue: string[], currentValue: string[]): string[] => [
      ...previousValue,
      ...currentValue,
    ],
    [],
  );

describe('rules', (): void => {
  it.each(ruleNames)(
    'should have a corresponding documentation file for rule: %s',
    async (rule: string): Promise<void> => {
      expect.assertions(1);

      const documentPath = resolve(__dirname, '../docs/rules', `${rule}.md`);
      const isDocumented = await existsAsync(documentPath);

      expect(isDocumented).toStrictEqual(true);
    },
  );

  it('should have the correct amount of rules', (): void => {
    expect.assertions(1);

    const { length } = ruleNames;

    expect(length).toStrictEqual(numberOfRules);
  });

  it('should export configs that refer to actual rules', (): void => {
    expect.assertions(3);

    const recommendedConfigs = internalRules.configs;

    expect(recommendedConfigs).toMatchSnapshot();
    expect(Object.keys(recommendedConfigs)).toStrictEqual([
      'all',
      'recommended',
    ]);
    expect(Object.keys(recommendedConfigs.all.rules)).toHaveLength(
      ruleNames.length,
    );
  });

  it.each(allConfigRules)(
    '%s should be included and prefixed',
    (rule: string): void => {
      expect.assertions(2);

      const ruleNamePrefix = '@ridedott/';
      const ruleName = rule.slice(ruleNamePrefix.length);
      expect(rule.startsWith(ruleNamePrefix)).toBe(true);
      expect(ruleNames).toContain(ruleName);
    },
  );
});
