# Single line comments should not be in a block comment (no-single-line-comment-block)

Block comments should be used for JSDoc notation and multiline comments only.
Every comment that is just in one line should use line comment notation instead.

This rule ignores special cases for `eslint` configuration.

## Rule Details

Examples of **incorrect** code for this rule:

```js
/*
 * Only one line in this block
 */

/* Only one line in this block (single line) */
```

Examples of **correct** code for this rule:

```js
/*
 * Two lines
 * in this block
 */

/**
 * One line JSDoc block
 */

/* eslint-disable someRule */

/* eslint-enable someRule */

/* eslint-disable-next-line someRule */

/* eslint-enable-next-line someRule */

/* global var1, var2 */

/* eslint-env node */

// Only one line in comment notation
```

## When Not To Use It

When you do not have a preference on using single line comment notation for
single line comments.

## Further Reading

See [here](https://eslint.org/docs/user-guide/configuring) for more details
about in-file configuration of Eslint
