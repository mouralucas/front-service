# Linting the front-service repo

This document explains how to run ESLint for this project (macOS, zsh). It includes the repo's available scripts and a small troubleshooting section.

## What this repo provides

- `package.json` includes a script:

  - `lint`: runs `eslint .`

- There is a helper script at the repo root: `lint.sh`.
  - `lint.sh` detects the package manager (npm / yarn / pnpm) and runs:
    `eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0`
  - It exits non-zero if no supported package manager is detected.

## Prerequisites

- Node.js and your project's package manager installed (npm, yarn or pnpm).
- Install dependencies at the repo root before running the linter:

  - npm

    ```bash
    npm install
    ```

  - yarn

    ```bash
    yarn install
    ```

  - pnpm

    ```bash
    pnpm install
    ```

## Recommended ways to run the linter

1) Use the helper script (recommended). It auto-detects the package manager and runs ESLint with strict options:

```bash
# Make sure it is executable, then run it
chmod +x ./lint.sh
./lint.sh
```

2) Use the npm script (works with any package manager if you prefix appropriately):

```bash
# with npm
npm run lint

# with yarn
yarn lint

# with pnpm
pnpm run lint
```

Note: `npm run lint` runs `eslint .`. The helper `lint.sh` limits the linted files to `src/**/*.{js,jsx,ts,tsx}` and uses `--max-warnings=0` which fails on warnings — use the helper if you want that stricter behavior.

3) Run ESLint directly (useful in CI or to run autofix):

```bash
# Run ESLint on source files and fail on warnings
npx eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0

# Auto-fix fixable issues
npx eslint "src/**/*.{js,jsx,ts,tsx}" --fix
```

(When using zsh, keep the glob quoted as shown to avoid shell expansion.)

## VS Code

- Install the ESLint extension for VS Code and enable "Auto Fix on Save" or configure the editor to use the project's ESLint.
- Make sure VS Code uses the workspace's Node and not a global ESLint when prompted.

## CI suggestions

- In CI, prefer the helper `./lint.sh` or `npx eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0` so the run fails on warnings.
- Run `npm ci` (or `pnpm install --frozen-lockfile` / `yarn --frozen-lockfile`) before linting to guarantee reproducible installs.

## Troubleshooting

- "eslint: command not found"
  - Ensure dependencies are installed (`npm ci` / `npm install`).
  - Or run via `npx eslint ...` so the local binary is used.

- Linter still shows errors after fixing locally
  - Try `npx eslint "src/**/*.{js,jsx,ts,tsx}" --fix` then re-run the lint command.

- Want to exclude files or change rules
  - Update your repo's ESLint configuration (`eslint.config.js` at repo root) or add `.eslintignore`.

## Quick checklist

- Install deps: `npm install` (or `yarn` / `pnpm install`)
- Preferred run (strict): `./lint.sh` (ensures `--max-warnings=0`)
- Alternative: `npm run lint` or `npx eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings=0`

---

If you want, I can also:
- Add an `.eslintignore` with common ignores (build output, dist, etc.),
- Add an npm script that mirrors `lint.sh` behavior, or
- Configure a pre-commit hook (husky) to run linting automatically.

Tell me which of those you'd like next.