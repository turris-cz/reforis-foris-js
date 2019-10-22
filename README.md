# foris-js

## Publishing package

### Beta versions

Each commit to `dev` branch will result in publishing a new version of library
tagged `beta`. Versions names are based on commit SHA, e.g. 
`foris@0.1.0-beta.d9073aa4`.

### Preparing a release

1. Crete a merge request to `dev` branch with version bumped
2. When merging add `[skip ci]` to commit message to prevent publishing
unnecessary version
3. Create a merge request from `dev` to `master` branch
4. New version should be published automatically
