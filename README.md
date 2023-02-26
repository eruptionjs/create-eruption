# create-eruption 🌋

> The official template to create a Eruption project.

## Usage

To initialize a new project, run the following command (with you prefered package manager)):

```bash
npm init eruption@latest
```

```bash
yarn create eruption@latest
```

```bash
pnpm create eruption@latest
```

### Contributing to this CLI

The CLI uses [Clack](https://github.com/natemoo-re/clack) to generate the prompt. The main file is located in `lib/eruption-cli.mjs`. To run the CLI locally, run the following command on the root of the repository:

```bash
pnpm run dev
```

This command will run the CLI in watch mode, so you can make changes and see them reflected in the CLI.

### What is in this repository?

- [PNPM](https://pnpm.io/workspaces) as workspace manager and package manager.
- [TSUP](https://tsup.egoist.dev/) as a TypeScript universal package.
- [Vitest](https://vitest.dev/) as a test runner.
- [Size Limit](https://github.com/ai/size-limit) as a size limit plugin.
- [Prettier](https://prettier.io/) as a code formatter.
- [ESLint](https://eslint.org/) as a code linter.

### Folder structure

- [docs](./docs/) - An empty folder to store documentation.
- [lib](./lib/) - The CLI source.

## License

MIT @ EruptionJS and its contributors.
