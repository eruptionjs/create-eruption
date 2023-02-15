import { intro, outro, text, select, confirm, spinner, note } from '@clack/prompts';
import { underline, green } from 'kleur';
import { setTimeout } from 'node:timers/promises';

import { AVAILABLE_KITS } from './constants.mjs';
import { handleCancelation, getKitFromGitHub } from './utils';

export async function main() {
  intro(`Welcome to the Eruption CLI 🌋`);

  const projectName = await text({
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

  const kit = await select({
    message: 'Select your Eruption kit',
    options: AVAILABLE_KITS,
  });

  handleCancelation(kit);

  const initGitRepo = await confirm({
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
    s.start('Starting the project... ⏳');
    await getKitFromGitHub(kit as string, projectName as string);
    s.stop('Done ✅');
  }

  const nextSteps = `cd ${projectName as string}        \n${
    install ? '' : 'npm install\n'
  }npm run dev`;

  note(nextSteps, 'Next steps:');

  await setTimeout(1000);

  outro(
    `Well done! If you have any problem, feel free to open an issue: ${underline(
      green('https://github.com/eruptionjs/create-eruption')
    )}`
  );
}
