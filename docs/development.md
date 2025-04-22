At some point, you'll likely need to modify the library. When that happens, your
best friend will be [`npm link`](https://docs.npmjs.com/cli/link).

**Important Note:** Simply linking from the repo root won't work because the
source files are in `./src`. Instead, you'll need to:

1. First package the library using `make pack`
2. Then link it from the `./dist` directory

While this isn't the most developer-friendly workflow, you can improve it by
creating a script that:

- Symlinks all files/directories from `./src` to another location
- Also links `package.json` and `package-lock.json`

## Quick Start Guide

```bash
# Package and link the library
make pack
cd dist
npm link

# Link to your project
cd /path/to/your/project/js  # Navigate to your project's JS directory
npm link foris
```
