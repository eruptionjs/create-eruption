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
