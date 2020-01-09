#!/bin/sh

# Collect files
mkdir -p dist
cp -rf ./src/* dist
cp package.json package-lock.json README.md dist
sed -i 's/\/src//g' dist/package.json # remove ./src from main js file path

cp -rf translations dist

# Remove unwanted files
find dist -type d -name __tests__ -exec rm -r {} +
rm -rf dist/__mocks__
