import { render } from 'cli-testing-library';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';

import { CLIUserEvents } from '../src/testUtils';

describe('eruption-cli', () => {
  const cliPath = resolve(__dirname, '../eruption-cli.mjs');
  it('should render the cli prompts (without CLI flags)', async () => {
    const { findByText, userEvent } = await render('node', [cliPath]);
    const projectName = await findByText(/What is the name of your project/i);

    expect(projectName).toBeTruthy();

    // Simulate the project name being entered and the enter key being pressed.
    userEvent.keyboard(`my-project${CLIUserEvents.Enter}`);
    expect(await findByText(/my-project/i)).toBeTruthy();

    const kit = await findByText(/Select your Eruption kit/i);
    expect(kit).toBeTruthy();

    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting the core kit)
    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);
    expect(await findByText(/core/i)).toBeTruthy();

    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting the core kit)
    const confirm = await findByText(/Do you want to continue/i);
    expect(confirm).toBeTruthy();

    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);

    expect(await findByText(/starting the project/i)).toBeTruthy();
    expect(await findByText(/Done/i)).toBeTruthy();
  });
});
