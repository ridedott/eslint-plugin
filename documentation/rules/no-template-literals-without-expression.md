# There should not be template literals without expressions (no-template-literals-without-expression)

If the template literal does not contain expressions (or both single quotes and
double quotes) then it should be a normal string.

This rule provides the option to allow template literals when the sting has
multiple lines.

## Rule Details

Examples of **incorrect** code for this rule:

```js
`Single line template literal without expressions`;

`Single line template literal without expressions with 'single quotes'`;

`Multiline template literal
without expressions`;
```

Examples of **correct** code for this rule:

```js
`Single line template literal with ${expression}`;

`Multiline template literal
with ${expression}`;

`Single line template literal without expressions, 'single quotes', "double quotes"`;

tag`string text`;

tag`string text line 1 \n string text line 2`;
```

## Options

```JSON
{
  "@ridedott/no-template-literals-without-expression": [
    "error",
    {
      "ignoreMultiline": true,
    }
  ]
}
```

### `ignoreMultiline`

This option whitelists multiline template literals so that this rule does not
report their usage as being incorrect.

Example of correct code for the `{ "ignoreMultiline": true }` option:

```js
/* eslint @ridedott/no-template-literals-without-expression: ["error", { "ignoreMultiline": true }] */

`Multiline template literal
without expressions.`;
```

By default, this option is set to `{ "ignoreMultiline": false }`.

## When Not To Use It

When you do not have a preference on using template literals without
expressions.

## Further Reading

See [here](https://eslint.org/docs/user-guide/configuring) for more details
about in-file configuration of Eslint
