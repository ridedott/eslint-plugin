/* eslint-disable import/no-default-export */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */

import{ unlink, writeFile } from 'fs';
import {TestEnvironment} from 'jest-environment-node';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { promisify } from 'util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const asyncWriteFile = promisify(writeFile);
const asyncUnlink = promisify(unlink);
const testMapFile = join(__dirname, '..', 'src', 'rules', 'test.js.map');

class CustomEnvironment extends TestEnvironment {
  constructor(config, context) {
    super(config, context);
    this.testPath = context.testPath;
    this.docblockPragmas = context.docblockPragmas;
  }

  async setup() {
    if (this.docblockPragmas['test-map-files'] !== undefined) {
      await asyncWriteFile(testMapFile, 'test map file');
    }

    await super.setup();
  }

  async teardown() {
    await super.teardown();

    if (this.docblockPragmas['test-map-files'] !== undefined) {
      await asyncUnlink(testMapFile);
    }
  }

  runScript(script) {
    return super.runScript(script);
  }
}

export default CustomEnvironment;
