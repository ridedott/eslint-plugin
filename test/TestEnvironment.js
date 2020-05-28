const NodeEnvironment = require('jest-environment-node');
const { unlink, writeFile } = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const asyncWriteFile = promisify(writeFile);
const asyncUnlink = promisify(unlink);
const testMapFile = join(__dirname, '..', 'src', 'rules', 'test.js.map');

class CustomEnvironment extends NodeEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
  }

  async setup() {
    await asyncWriteFile(testMapFile, 'test map file');
    await super.setup();
  }

  async teardown() {
    await super.teardown();
    await asyncUnlink(testMapFile);
  }

  runScript(script) {
    return super.runScript(script);
  }
}

module.exports = CustomEnvironment;
