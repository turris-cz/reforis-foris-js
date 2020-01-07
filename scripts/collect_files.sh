#!/bin/sh

# Collect files
mkdir -p dist
cp -rf ./src dist
cp package.json package-lock.json README.md dist
cp -rf translations dist
# Remove unwanted files
rm -rf dist/**/__tests__
rm -rf dist/__mocks__
