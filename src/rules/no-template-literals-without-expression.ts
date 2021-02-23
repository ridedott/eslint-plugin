import {
  AST_NODE_TYPES,
  TSESLint,
  TSESTree,
} from '@typescript-eslint/experimental-utils';

import { createRule } from '../util';

type Options = ReadonlyArray<{
  ignoreMultiline: boolean;
}>;

const verifyTemplateLiteral = (
  node: TSESTree.TemplateLiteral,
  context: Readonly<
    TSESLint.RuleContext<'templateLiteralsShouldHaveExpression', Options>
  >,
  ignoreMultiline: boolean,
): void => {
  const [valueHasSingleQuotes, valueHasDoubleQuotes] = node.quasis.reduce(
    (acc: boolean[], curr: TSESTree.TemplateElement): boolean[] => [
      acc[0] === false ? curr.value.raw.includes("'") : acc[0],
      acc[1] === false ? curr.value.raw.includes('"') : acc[1],
    ],
    [false, false],
  );
  const hasNoExpressions = node.expressions.length === 0;
  const isMultiline = node.loc.start.line !== node.loc.end.line;

  const ruleFixer = (fixer: TSESLint.RuleFixer): TSESLint.RuleFix[] => {
    if (valueHasSingleQuotes === true) {
      return [
        fixer.replaceTextRange([node.range[0], node.range[0] + 1], '"'),
        fixer.replaceTextRange([node.range[1] - 1, node.range[1]], '"'),
      ];
    }

    return [
      fixer.replaceTextRange([node.range[0], node.range[0] + 1], "'"),
      fixer.replaceTextRange([node.range[1] - 1, node.range[1]], "'"),
    ];
  };

  if (
    (isMultiline === true && ignoreMultiline === true) ||
    (valueHasSingleQuotes === true && valueHasDoubleQuotes === true)
  ) {
    return;
  }

  if (hasNoExpressions === true) {
    if (isMultiline === false) {
      context.report({
        messageId: 'templateLiteralsShouldHaveExpression',
        loc: node.loc,
        fix: ruleFixer,
      });
    }

    if (isMultiline === true) {
      context.report({
        messageId: 'templateLiteralsShouldHaveExpression',
        loc: node.loc,
      });
    }
  }
};

export default createRule({
  name: __filename,
  meta: {
    docs: {
      category: 'Best Practices',
      description: 'There should not be template literals without expressions.',
      recommended: false,
    },
    fixable: 'code',
    messages: {
      templateLiteralsShouldHaveExpression:
        'Template literals should contain an expression.',
    },
    type: 'suggestion',
    schema: [
      {
        type: 'object',
        properties: {
          ignoreMultiline: {
            type: 'boolean',
          },
        },
        additionalProperties: false,
      },
    ],
  },
  defaultOptions: [{ ignoreMultiline: false }],
  create(
    context: Readonly<
      TSESLint.RuleContext<'templateLiteralsShouldHaveExpression', Options>
    >,
    [{ ignoreMultiline }]: Options,
  ): {
    ExpressionStatement: (node: TSESTree.ExpressionStatement) => void;
  } {
    return {
      ExpressionStatement(node: TSESTree.ExpressionStatement): void {
        if (node.expression.type === AST_NODE_TYPES.TaggedTemplateExpression) {
          return;
        }

        if (node.expression.type === AST_NODE_TYPES.TemplateLiteral) {
          verifyTemplateLiteral(node.expression, context, ignoreMultiline);
        }
      },
    };
  },
});
