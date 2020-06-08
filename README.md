# eslint-plugin

[![GitHub Actions Status](https://github.com/ridedott/eslint-plugin/workflows/Continuous%20Integration/badge.svg?branch=master)](https://github.com/ridedott/eslint-plugin/actions)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<!-- Short and clear description of the package -->

## Usage

### Basic setup

To use this plugin, install it as a `devDependency` first, alongside ESLint
itself:

```bash
npm install --save-dev @ridedott/eslint-plugin eslint
```

## Rules

| Rule                                        | Description                                                | Configurations   | Fixable  |
| ------------------------------------------- | ---------------------------------------------------------- | ---------------- | -------- |
| [no-single-line-comment-block][]            | Single line comments should not be in a block comment.     | ![recommended][] |          |
| [no-template-literals-without-expression][] | There should not be template literals without expressions. | ![recommended][] | ![fix][] |

## Getting Started

These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See usage notes on how to
consume this package in your project.

<!-- Instructions -->

### Prerequisites

Minimal requirements to set up the project:

- [Node.js](https://nodejs.org/en) v12, installation instructions can be found
  on the official website, a recommended installation option is to use
  [Node Version Manager](https://github.com/creationix/nvm#readme). It can be
  installed in a
  [few commands](https://nodejs.org/en/download/package-manager/#nvm).
- A package manager [npm](https://www.npmjs.com). All instructions in the
  documentation will follow the npm syntax.
- Optionally a [Git](https://git-scm.com) client.

### Installing

Start by cloning the repository:

```bash
git clone git@github.com:ridedott/eslint-plugin.git
```

In case you don't have a git client, you can get the latest version directly by
using [this link](https://github.com/ridedott/eslint-plugin/archive/master.zip)
and extracting the downloaded archive.

Go the the right directory and install dependencies:

```bash
cd eslint-plugin
npm install
```

That's it! You can now go to the next step.

## Tests

### Formatting

This project uses [Prettier](https://prettier.io) to automate formatting. All
supported files are being reformatted in a pre-commit hook. You can also use one
of the two scripts to validate and optionally fix all of the files:

```bash
npm run format
npm run format:fix
```

### Linting

This project uses [ESLint](https://eslint.org) to enable static analysis.
TypeScript files are linted using a [custom configuration](./.eslintrc). You can
use one of the following scripts to validate and optionally fix all of the
files:

```bash
npm run lint
npm run lint:fix
```

### Coverage

[Coveralls.io](https://coveralls.io)

## Publishing

Publishing is handled in an automated way and must not be performed manually.

Each commit to the master branch is automatically deployed to the NPM registry
with a version specified in `package.json`. All other commits are published as
pre-releases.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md).

## Built with

### Runtime libraries

### Automation

- [GitHub Actions](https://github.com/features/actions)
- [Dependabot](https://dependabot.com/)

### Source

- [TypeScript](https://www.typescriptlang.org)

### Delivery

## Versioning

This project adheres to [Semantic Versioning](http://semver.org) v2.

[no-single-line-comment-block]:
  documentation/rules/no-single-line-comment-block.md
[no-template-literals-without-expression]:
  documentation/rules/no-template-literals-without-expression.md
[recommended]: https://img.shields.io/badge/-recommended-blueviolet.svg
[fix]: https://img.shields.io/badge/-fix-yellow.svg
