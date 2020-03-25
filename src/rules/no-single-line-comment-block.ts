import {
  AST_TOKEN_TYPES,
  TSESTree,
} from '@typescript-eslint/experimental-utils';

import { createRule } from '../util';

/**
 * Checks for eslint specific in file configuration comments.
 */
const hasSpecialCases = (lines: string[]): boolean => {
  const specialCases = [
    'eslint-disable',
    'eslint-enable',
    'eslint-env',
    'eslint',
    'global',
  ];

  const specialCasesRegExp = new RegExp(
    `^( |)(${specialCases.join('|')})`,
    'gmu',
  );

  for (const element of lines) {
    if (specialCasesRegExp.test(element) === true) {
      return true;
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
    schema: [],
  },
  defaultOptions: [],
  create(
    /* eslint-disable @typescript-eslint/typedef */
    context,
    /* eslint-enable @typescript-eslint/typedef */
  ): {
    Program(): void;
  } {
    const MIN_NUMBER_OF_LINES = 3;
    const sourceCode = context.getSourceCode();

    const checkComment = (comment: TSESTree.Comment): void => {
      if (comment.type !== AST_TOKEN_TYPES.Block) {
        return;
      }

      const blockCommentLines = comment.value.split('\n');
      const numberOfLines = blockCommentLines.length;

      if (
        numberOfLines <= MIN_NUMBER_OF_LINES &&
        blockCommentLines[0].startsWith('*') === false &&
        hasSpecialCases(blockCommentLines) === false
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
