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

/**
 * Remove a file from a given path.
 */
export async function removeFile(fileName: string, directoryPath: string): Promise<boolean> {
  let removed: boolean;
  try {
    await fs.unlink(path.join(directoryPath, fileName));
    removed = true;
  } catch (err) {
    removed = false;
  }
  return removed;
}

/**
 * Initialize the Node project and update the package.json with the project name.
 */
export async function initNodeProject(
  packageJsonPath: string,
  projectDestPath: string,
  projectName: string
) {
  const packageJSON = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
  packageJSON.name = projectName;
  packageJSON.version = '1.0.0';

  try {
    await fs.writeFile(
      path.join(projectDestPath, 'package.json'),
      JSON.stringify(packageJSON, null, 2)
    );

    await removeFile('package-lock.json', projectDestPath);
    await removeFile('yarn.lock', projectDestPath);
    await removeFile('pnpm-lock.yaml', projectDestPath);
  } catch (_) {
    cancel('Failed to update package.json. You may need to update manually');
  }
}
