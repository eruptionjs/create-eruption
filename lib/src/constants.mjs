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

/**
 * The available kits.
 * @returns {@type{import('./types').Kit[]}} returns a list of available kits.
 */
export const AVAILABLE_KITS = [
  {
    label: 'Eruption Core (React, Vite and Vitest)',
    value: 'core',
  },
  {
    label: 'Another Eruption (SolidJS, Vite and Vitest)',
    value: 'eruption-solid',
    hint: 'Not available, yet 😢',
  },
];
