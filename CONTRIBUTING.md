# Contributing

Contributions are welcome. Bug reports, documentation improvements, tests, and focused code changes all help improve the project.

## Before You Start

- Search existing issues and pull requests before opening a new one.
- For a substantial feature or architectural change, open an issue first so the approach and scope can be discussed.
- Do not report security vulnerabilities through a public issue. Follow [SECURITY.md](SECURITY.md) instead.

## Development Workflow

1. Fork the repository on GitHub.
2. Clone your fork:

   ```bash
   git clone https://github.com/<your-username>/vue-antdesign-admin-template.git
   cd vue-antdesign-admin-template
   ```

3. Create a focused branch:

   ```bash
   git switch -c <branch-name>
   ```

4. Install dependencies and start the development server:

   ```bash
   pnpm install
   pnpm dev
   ```

5. Before submitting, run the available test and production build commands:

   ```bash
   pnpm test
   pnpm build
   ```

Follow the repository's existing ESLint, Prettier, EditorConfig, and surrounding code style. Keep changes limited to the work being proposed.

## Pull Requests

- Keep the scope clear and focused.
- Explain what changed and why.
- Include screenshots for visible UI changes.
- Avoid unrelated refactors, formatting changes, or generated diffs.
- Add or update tests when behavior changes.

Concise commit subjects with prefixes such as `feat:`, `fix:`, `docs:`, `test:`, or `chore:` are recommended, but are not required.

## License

By contributing, you agree that your contributions will be licensed under the project's [MIT License](LICENSE).
