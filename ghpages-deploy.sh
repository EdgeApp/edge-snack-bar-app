#!/bin/sh

yarn parcel build --public-url ./
rm -rf docs
cp -a dist docs
git branch --delete --force gh-pages
git checkout --orphan gh-pages
git reset
git add -f docs config.json
git commit -m "Deploy to GitHub pages"
git push -f origin gh-pages
git switch main --force
