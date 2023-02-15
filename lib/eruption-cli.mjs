#!/usr/bin/env node
'use strict';

import { REQUIRED_MAJOR_VERSION, CLIENT_NODE_VERSION } from './src/constants.mjs';

if (REQUIRED_MAJOR_VERSION < CLIENT_NODE_VERSION) {
  console.error(`Your NodeJS version must be ${REQUIRED_MAJOR_VERSION} or higher`);
  process.exit(1);
}

import('./dist/index.js').then(({ main }) => main());
