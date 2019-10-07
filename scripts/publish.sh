#!/bin/sh

if test -z "$NPM_TOKEN"
then
    echo "\$NPM_TOKEN is not set"
    exit 1
else
    # Need to replace "_" with "_" as GitLab CI won't accept secret vars with "-"
    echo "//registry.npmjs.org/:_authToken=$(echo $NPM_TOKEN | tr _ -)" > .npmrc
    echo "unsafe-perm = true" >> ~/.npmrc
    if test "$1" = "beta"
    then
        npm version prerelease --preid=$CI_COMMIT_SHORT_SHA --git-tag-version false
        npm publish --tag beta
    elif test "$1" = "latest"
    then
        npm publish
    else
        echo "Usage: publish.sh [ beta | latest ]"
        exit 1
    fi
fi
