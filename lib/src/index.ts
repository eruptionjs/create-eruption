import { intro, outro, text, select, confirm, spinner, note, cancel } from '@clack/prompts';
import { underline, green } from 'kleur';
import { setTimeout } from 'node:timers/promises';
import path from 'path';
import parser from 'yargs-parser';

import { AVAILABLE_KITS } from './constants';
import {
  handleCancelation,
  getKitFromGitHub,
  initGitRepo as initializeGit,
  initNodeProject,
  removeFolder,
  removeFile,
} from './utils';

export async function main() {
  const cleanArgv = process.argv.filter((arg) => arg !== '--');
  const args = parser(cleanArgv, {
    string: ['name', 'kit'],
    boolean: ['git', 'yes', 'vscode'],
    default: {
      git: true,
    },
  });

  intro(`Welcome to the Eruption CLI 🌋`);

  const projectName = args?.name
    ? args.name
    : await text({
        message: 'What is the name of your project?',
        initialValue: 'eruption',
        placeholder: 'E.g: my-awesome-project',
        validate(value) {
          if (value.length === 0) {
            return `The project name is required!`;
          }
        },
      });

  handleCancelation(projectName);

  const kit = args.kit
    ? args.kit
    : await select({
        message: 'Select your Eruption kit',
        options: AVAILABLE_KITS,
      });

  handleCancelation(kit);

  const initGitRepo =
    'git' in args
      ? args.git
      : await confirm({
          message: 'Do you want to initialize a git repo?',
          initialValue: false,
        });

  handleCancelation(initGitRepo);

  const useVscode =
    'vscode' in args
      ? args.vscode
      : await confirm({
          message: 'Do you want to include .vscode folder? (Recommended if you are using vscode)',
          initialValue: true,
        });

  handleCancelation(useVscode);

  const dockerSupport =
    'docker' in args
      ? args.vscode
      : await confirm({
          message: 'Do you want to include Docker support?',
          initialValue: false,
        });

  const install =
    'yes' in args
      ? args.yes
      : await confirm({
          message: 'Do you want to continue?',
          initialValue: false,
        });

  handleCancelation(install);

  if (install) {
    const s = spinner();
    const destPath = path.join(process.cwd(), projectName as string);
    const packageJsonPath = path.join(destPath, 'package.json');
    s.start('Starting the project... ⏳');
    await getKitFromGitHub(kit as string, projectName as string);
    await initNodeProject(packageJsonPath, destPath, projectName as string);
    s.stop('Done ✅');
  } else {
    cancel('Ok, installation canceled. See you later! 🤗');
    process.exit(1);
  }

  if (!useVscode) {
    const s = spinner();
    s.start('Removing .vscode folder... ⏳');
    const destPath = path.join(process.cwd(), projectName as string);
    await removeFolder('.vscode', destPath);
    s.stop('Done ✅');
  }

  if (!dockerSupport) {
    const s = spinner();
    s.start('Removing docker related files... ⏳');
    const destPath = path.join(process.cwd(), projectName as string);
    await removeFile('.dockerignore', destPath);
    await removeFile('Dockerfile', destPath);
    await removeFile('dockerfile.dev', destPath);
    await removeFile('docker-compose-dev.yml', destPath);
    await removeFile('docker-compose.yml', destPath);
    s.stop('Done ✅');
  }

  if (initGitRepo) {
    const projectFolder = path.join(process.cwd(), projectName as string);
    try {
      await initializeGit(projectFolder);
    } catch (error: unknown) {
      cancel(`Something happen during the git initialization.`);
      process.exit(1);
    }
  }

  const nextSteps = `cd ${projectName as string}        \n${
    install ? 'npm install\n' : ''
  }npm run dev`;

  note(nextSteps, 'Next steps:');

  await setTimeout(1000);

  outro(
    `Well done! If you have any problem, feel free to open an issue: ${underline(
      green('https://github.com/eruptionjs/create-eruption')
    )}`
  );
}
