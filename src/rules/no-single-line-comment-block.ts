import {
  AST_TOKEN_TYPES,
  TSESLint,
  TSESTree,
} from '@typescript-eslint/experimental-utils';

import { createRule } from '../util';

type Options = ReadonlyArray<{
  ignore: string[];
  ignorePatterns: string[];
}>;

/**
 * Checks for eslint specific in file configuration comments.
 * It also checks for custom cases passed from `ignore` and `ignorePatterns`
 * options.
 */
const hasSpecialCases = (
  lines: string[],
  ignore: string[],
  ignoreRegex: RegExp[],
): boolean => {
  const specialCases = [
    'eslint-disable',
    'eslint-enable',
    'eslint-env',
    'eslint',
    'global',
    'c8',
    'istanbul',
  ];

  const specialCasesRegExp = new RegExp(
    `^( |)(${[...specialCases, ...ignore].join('|')})`,
    'gmu',
  );

  for (const element of lines) {
    if (specialCasesRegExp.test(element) === true) {
      return true;
    }

    for (const customRegex of ignoreRegex) {
      if (customRegex.test(element) === true) {
        return true;
      }
    }
  }

  return false;
};

// eslint-disable-next-line import/no-default-export
export default createRule({
  create(
    context: Readonly<TSESLint.RuleContext<'useSingleLineNotation', Options>>,
    [{ ignore, ignorePatterns }]: Options,
  ): {
    Program: () => void;
  } {
    const MIN_NUMBER_OF_LINES = 3;
    const sourceCode = context.getSourceCode();
    const ignoreRegex = ignorePatterns.map(
      (pattern: string): RegExp => new RegExp(pattern, 'gmu'),
    );

    const checkComment = (comment: TSESTree.Comment): void => {
      if (comment.type !== AST_TOKEN_TYPES.Block) {
        return;
      }

      const blockCommentLines = comment.value.split('\n');
      const numberOfLines = blockCommentLines.length;

      if (
        numberOfLines <= MIN_NUMBER_OF_LINES &&
        blockCommentLines[0].startsWith('*') === false &&
        hasSpecialCases(blockCommentLines, ignore, ignoreRegex) === false
      ) {
        context.report({
          fix: (fixer: TSESLint.RuleFixer): TSESLint.RuleFix | null => {
            if (blockCommentLines.length === MIN_NUMBER_OF_LINES) {
              return fixer.replaceTextRange(
                comment.range,
                `// ${blockCommentLines[1].split('*')[1].trim()}`,
              );
            }

            if (blockCommentLines.length === 1) {
              return fixer.replaceTextRange(
                comment.range,
                `// ${blockCommentLines[0].trim()}`,
              );
            }

            return null;
          },
          loc: comment.loc,
          messageId: 'useSingleLineNotation',
        });
      }
    };

    return {
      Program(): void {
        const comments = sourceCode.getAllComments();

        for (const comment of comments) {
          checkComment(comment);
        }
      },
    };
  },
  defaultOptions: [{ ignore: [], ignorePatterns: [] }],
  meta: {
    docs: {
      description: 'Single line comments should not be in a block comment.',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      useSingleLineNotation: 'Use line comment notation instead.',
    },
    schema: [
      {
        additionalProperties: false,
        properties: {
          ignore: {
            additionalItems: false,
            items: { type: 'string' },
            type: 'array',
          },
          ignorePatterns: {
            additionalItems: false,
            items: { type: 'string' },
            type: 'array',
          },
        },
        type: 'object',
      },
    ],
    type: 'suggestion',
  },
  name: __filename,
});
