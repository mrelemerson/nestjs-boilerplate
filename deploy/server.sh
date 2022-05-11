#!/bin/bash

DOPPLER_SERVICE_TOKEN=$1
WORKING_BRANCH=$2
WORKING_DIRECTORY=$3

export HISTIGNORE='doppler run*'

source $HOME/.nvm/nvm.sh

# Pull code
cd $WORKING_DIRECTORY

git reset --hard
git clean -f
git remote update
git checkout $WORKING_BRANCH
git pull

# Build and deploy
nvm use node
yarn install
pm2 flush
doppler run --token=$DOPPLER_SERVICE_TOKEN -- pm2 restart pm2.json
pm2 save
