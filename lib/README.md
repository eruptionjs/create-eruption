# create-eruption 🌋

> The official template to create a new Eruption project.

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

The CLI will ask you a few questions (_in interactive_ mode) and then create a new project for you, but you can also pass a few flags to skip the interactive mode.

## Available Kits

| Name | Description                            | Repository                         |
| ---- | -------------------------------------- | ---------------------------------- |
| core | The core kit (React, Vite and Vitest). | https://github.com/eruptionjs/core |

## CLI Flags

| Flag     | Description                                                                                               | Default     |
| -------- | --------------------------------------------------------------------------------------------------------- | ----------- |
| `--name` | The name of the project.                                                                                  | `undefined` |
| `--kit`  | The kit to use (e.g: core. The CLI will use the `https://github.com/eruptionjs/core` repository as base). | `undefined` |
| `git`    | Whether to initialize a git repository.                                                                   | `true`      |

## License

MIT
