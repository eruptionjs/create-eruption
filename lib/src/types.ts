/**
 * Kit shape.
 */
export type Kit = {
  value: string;
  label: string;
  hint?: string;
};

/**
 * CLI flags.
 */
export type Flags = {
  name: string;
  kit: string;
  git: boolean;
  install: boolean;
};
