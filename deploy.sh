#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# git push -f https://github.com/jack206418070/vue_training.git master:gh-pages

git push -f https://github.com/jack206418070/vue-week6.git master:gh-pages

cd -