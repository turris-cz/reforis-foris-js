#!/bin/sh

# Collect files
npm run build
cp package.json dist
cp -rf translations dist
# Remove unwanted files
rm -rf dist/**/__tests__
rm -rf dist/__mocks__
