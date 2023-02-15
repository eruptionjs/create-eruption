import { intro, outro, text, isCancel, cancel } from '@clack/prompts';
import kleur from 'kleur';

export async function main() {
  intro(`Welcome to Eruption CLI 🌋`);

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

  if (isCancel(projectName)) {
    cancel('Operation cancelled 💔');
  }

  outro('Well done!');
}
