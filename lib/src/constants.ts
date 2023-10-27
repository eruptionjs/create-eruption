import type { Kit } from './types';
/**
 * The available kits to create a new project.
 * @returns returns a list of available kits.
 */
export const AVAILABLE_KITS: Kit[] = [
  {
    label: 'Eruption Core (React, Vite and Vitest)',
    value: 'core',
    hint: 'The core kit for Eruption',
  },
];

/**
 * The available libraries to create a new library project.
 * @returns returns a list of available libraries.
 */
export const AVAILABLE_LIBRARIES: Kit[] = [
  {
    label: 'React + TypeScript',
    value: 'react-lib',
    hint: 'Create a React library with TypeScript',
  },
];
