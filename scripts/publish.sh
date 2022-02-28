#!/bin/sh

if test -z "$NPM_TOKEN"
then
    echo "\$NPM_TOKEN is not set"
    exit 1
else
    cd dist
    echo "//registry.npmjs.org/:_authToken=$(echo "$NPM_TOKEN")" > .npmrc
    echo "unsafe-perm = true" >> ~/.npmrc
    if test "$1" = "beta"
    then
        BETA_VERSION=$(npx -c 'echo "$npm_package_version"')-beta.$CI_COMMIT_SHORT_SHA
        npm version "$BETA_VERSION" --git-tag-version false
        npm publish --tag beta
    elif test "$1" = "latest"
    then
        npm publish
    else
        echo "Usage: publish.sh [ beta | latest ]"
        exit 1
    fi
fi
