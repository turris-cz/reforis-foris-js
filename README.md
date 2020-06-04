# foris-js
Set of utils and common React elements for reForis.

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

## Manually managed dependencies
Because of `<ForisForm />` component it's required to use exposed `ReactRouterDOM`
object from `react-router-dom` library. `ReactRouterDOM` is exposed by
[reForis](https://gitlab.labs.nic.cz/turris/reforis/reforis/blob/master/js/webpack.config.js).
It can be done by following steps:
 
1. Setting `react-router-dom` as `peerDependencies` and `devDependencies` in `package.json`.
2. Adding the following rules to `externals` in `webpack.conf.js` of the plugin:

```js
externals: {
    ...
    "react-router-dom": "ReactRouterDOM",
}
```

### Docs
Build or watch docs to get more info about library:
```bash
make docs
```
or
```bash
make docs-watch
```
