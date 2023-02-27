#!/usr/bin/env node
'use strict';

/**
 * @internal
 * Get the current NodeJS version.
 */
const NODE_VERSION = process.versions.node;

/**
 * The current NodeJS version from client.
 */
export const CLIENT_NODE_VERSION = parseInt(NODE_VERSION.split('.')[0]);

/**
 * Required NodeJS version.
 */
export const REQUIRED_MAJOR_VERSION = 16;

if (CLIENT_NODE_VERSION < REQUIRED_MAJOR_VERSION) {
  console.error(`Your NodeJS version must be ${REQUIRED_MAJOR_VERSION} or higher`);
  process.exit(1);
}

import('./dist/index.js').then(({ main }) => main());
