import { render, waitFor } from 'cli-testing-library';
import { resolve } from 'path';
import { describe, it, expect } from 'vitest';

import { CLIUserEvents } from '../src/testUtils';

describe('eruption-cli', () => {
  const cliPath = resolve(__dirname, '../eruption-cli.mjs');
  it('should render the cli prompts to create a Eruption application', async () => {
    const { findByText, userEvent } = await render('node', [cliPath]);
    const projectName = await findByText(/What is the name of your project/i);

    expect(projectName).toBeTruthy();

    // Simulate the project name being entered and the enter key being pressed.
    userEvent.keyboard(`my-project${CLIUserEvents.Enter}`);
    expect(await findByText(/my-project/i)).toBeTruthy();

    const flavor = await findByText(/Select your Eruption flavor/i);
    expect(flavor).toBeTruthy();
    userEvent.keyboard(`${CLIUserEvents.Enter}`);

    const kit = await findByText(/Select your Eruption kit/i);
    expect(kit).toBeTruthy();

    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting the core kit)
    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);
    expect(await findByText(/core/i)).toBeTruthy();

    const vscode = await findByText(/Do you want to include .vscode folder?/i);
    expect(vscode).toBeTruthy();
    // Simulate the user pressing the down arrow key and then the enter key. (We're removing vscode folder)
    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);

    const docker = await findByText(/Do you want to include Docker support?/i);
    expect(docker).toBeTruthy();
    // Simulate the user pressing the enter key. By default we aren't including docker support.
    userEvent.keyboard(`${CLIUserEvents.Enter}`);

    const packageManager = await findByText(/Select your package manager/i);
    expect(packageManager).toBeTruthy();
    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting yarn)
    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);

    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting the core kit)
    const confirm = await findByText(/Do you want to continue/i);
    expect(confirm).toBeTruthy();

    // Here we are confirming the cli prompts.
    userEvent.keyboard(`${CLIUserEvents.Enter}`);

    expect(await findByText(/starting the project/i)).toBeTruthy();
    await waitFor(() => expect(findByText(/Done/i)).toBeTruthy());
  });

  it.skip('should render the cli prompts to create a Eruption library', async () => {
    const { findByText, userEvent } = await render('node', [cliPath]);
    const projectName = await findByText(/What is the name of your project/i);

    expect(projectName).toBeTruthy();

    // Simulate the project name being entered and the enter key being pressed.
    userEvent.keyboard(`my-project${CLIUserEvents.Enter}`);
    expect(await findByText(/my-project/i)).toBeTruthy();

    const flavor = await findByText(/Select your Eruption flavor/i);
    expect(flavor).toBeTruthy();
    userEvent.keyboard(`${CLIUserEvents.ArrowLeft}${CLIUserEvents.Enter}`);

    const kit = await findByText(/Select your Eruption kit/i);
    expect(kit).toBeTruthy();

    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting the core kit)
    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);
    expect(await findByText('React + TypeScript')).toBeTruthy();

    const vscode = await findByText(/Do you want to include .vscode folder?/i);
    expect(vscode).toBeTruthy();
    // Simulate the user pressing the down arrow key and then the enter key. (We're removing vscode folder)
    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);

    const docker = await findByText(/Do you want to include Docker support?/i);
    expect(docker).toBeTruthy();
    // Simulate the user pressing the enter key. By default we aren't including docker support.
    userEvent.keyboard(`${CLIUserEvents.Enter}`);

    const packageManager = await findByText(/Select your package manager/i);
    expect(packageManager).toBeTruthy();
    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting yarn)
    userEvent.keyboard(`${CLIUserEvents.ArrowDown}${CLIUserEvents.Enter}`);

    // Simulate the user pressing the down arrow key and then the enter key. (For now, we are selecting the core kit)
    const confirm = await findByText(/Do you want to continue/i);
    expect(confirm).toBeTruthy();

    // Here we are confirming the cli prompts.
    userEvent.keyboard(`${CLIUserEvents.Enter}`);

    expect(await findByText(/starting the project/i)).toBeTruthy();
    await waitFor(() => expect(findByText(/Done/i)).toBeTruthy());
  });
});
