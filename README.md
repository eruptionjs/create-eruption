# pnpm-monorepo

> A PNPM monorepo template to my personal projects.

## What is in this repository?

- [PNPM](https://pnpm.io/workspaces) as workspace manager and package manager.
- [TSUP](https://tsup.egoist.dev/) as a TypeScript universal package.
- [Vitest](https://vitest.dev/) as a test runner.
- [Size Limit](https://github.com/ai/size-limit) as a size limit plugin.
- [Prettier](https://prettier.io/) as a code formatter.
- [ESLint](https://eslint.org/) as a code linter.
- [Turbo](https://turbo.build) as cacheable build tool.

## Using this repository

- clone the repository or click in "Use this template" button.
- Go to `lib/package.json` and edit the `name`, `description` and `author` fields.

## Folder structure

- docs - An empty folder to store documentation.
- example - A folder with an example project. Think as playground.
- lib - A folder with a library.

## Using Turbo to run commands

Turbo is a cacheable build tool. This project uses it to run the `build`, `test` and `coverage` commands.

```bash
# Instead of running `pnpm build`, run:
pnpx turbo build
```

## License

MIT @ Raí Siqueira
