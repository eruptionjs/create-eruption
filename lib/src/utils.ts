import { isCancel, cancel } from '@clack/prompts';
import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import tiged from 'tiged';

/**
 * Handle the user cancelation in the CLI.
 * @param value The value of Symbol of the clack prompt.
 */
export function handleCancelation(value: unknown) {
  if (!value) return;
  if (isCancel(value)) {
    cancel('Operation cancelled 💔');
    process.exit(0);
  }
}

/**
 * Check if a file exists.
 */
export async function fileExists(path: string) {
  try {
    await fs.stat(path);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return false;
    } else {
      throw error;
    }
  }
}

/**
 * Exec a command to initialize a new git repository.
 */
export async function initGitRepo(path: string) {
  return new Promise((resolve, reject) => {
    exec(`git init ${path}`, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(undefined);
      }
    });
  });
}

export async function getKitFromGitHub(kit: string, projectName: string) {
  // TODO: Implement using tiged;
  /** example: eruptionjs/core - That means tiged will clone the core repository. */
  const repoName = `eruptionjs/${kit}`;
  /** The destiny folder where the project will be cloned. */
  const destFolder = path.join(process.cwd(), projectName);

  const emitter = tiged(repoName, {
    cache: false,
    force: true,
    verbose: false,
    mode: 'tar',
  });

  try {
    await emitter.clone(destFolder);
  } catch (error: unknown) {
    cancel(error instanceof Error ? error.message : 'Something wrong happen 💔');
    process.exit(1);
  }
}
