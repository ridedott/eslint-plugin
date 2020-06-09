import {
  AST_TOKEN_TYPES,
  TSESTree,
} from '@typescript-eslint/experimental-utils';

import { createRule } from '../util';

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

export default createRule({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'Single line comments should not be in a block comment.',
      recommended: false,
    },
    messages: {
      useSingleLineNotation: 'Use line comment notation instead.',
    },
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          ignore: {
            type: 'array',
            items: { type: 'string' },
            additionalItems: false,
          },
          ignorePatterns: {
            type: 'array',
            items: { type: 'string' },
            additionalItems: false,
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ ignore: [], ignorePatterns: [] }],
  create(
    /* eslint-disable @typescript-eslint/typedef */
    context,
    /* eslint-enable @typescript-eslint/typedef */
    [{ ignore, ignorePatterns }]: Array<{
      ignore: string[];
      ignorePatterns: string[];
    }>,
  ): {
    Program(): void;
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
          messageId: 'useSingleLineNotation',
          loc: comment.loc,
        });
      }
    };

    return {
      Program(): void {
        const comments = sourceCode.getAllComments();

        comments.forEach((comment: TSESTree.Comment): void =>
          checkComment(comment),
        );
      },
    };
  },
});
