#!/bin/sh
set -e

# We are only interested in api builds, which are triggered when lcc_sharepoint_toolkit master is checked in.
echo "Event Type: $TRAVIS_EVENT_TYPE"
if [ $TRAVIS_EVENT_TYPE != "api" ]; then
  echo 'Build has not been triggered by api so exiting'
  exit 0;
fi

git checkout master
git reset --hard origin/master

wget https://github.com/lccgov/lcc_sharepoint_toolkit/archive/master.tar.gz -O new-toolkit.tar.gz

tar -xzf new-toolkit.tar.gz

cd lcc_sharepoint_toolkit-master/

rm -f package.json

# Toolkit development happens in a separate repository, so remove dev and docs-related things
rm -f readme.md
rm -rf spec
rm -f gulpfile.js
rm -f .gitignore
rm -rf bin
rm -f .travis.yml

# Move the actual toolkit files into the repo where this script is
rsync -a * ..

cd ..

rm -r lcc_sharepoint_toolkit-master
rm new-toolkit.tar.gz

VERSION_LATEST=`cat VERSION.txt`
#VERSION_REGISTRY=`npm view lcc_sharepoint_toolkit version`

#if [ "$VERSION_LATEST" != "$VERSION_REGISTRY" ]; then
  git config --global user.email "builds@travis-ci.org"
  git config --global user.name "Travis CI"
  git add -A
  git commit -m "Temporary commit new toolkit files"
  npm version $VERSION_LATEST
  git reset --soft HEAD~2
  git add -A
  git commit -m "Bump npm version of lcc_sharepoint_toolkit to $VERSION_LATEST [ci skip]"
  echo "Publishing package $VERSION_LATEST";
  npm whoami
  npm publish
  git push --quiet https://$GITHUBKEY@github.com/$TRAVIS_REPO_SLUG > /dev/null 2>&1
#else
 # echo 'VERSION.txt is the same as the version available on the registry'
#  echo 'Not publishing anything'
#fi