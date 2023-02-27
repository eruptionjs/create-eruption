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
} from './utils';

export async function main() {
  const cleanArgv = process.argv.filter((arg) => arg !== '--');
  const args = parser(cleanArgv, {
    string: ['name', 'kit'],
    boolean: ['git'],
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

  const install = await confirm({
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
