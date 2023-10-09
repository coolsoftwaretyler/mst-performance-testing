#!/bin/bash

# Get the current day and time 
now=$(date +"%Y-%m-%dT%H:%M:%S")

# Check the package-lock.json file for the version of mobx-state-tree
mst_version=$(grep -A 1 '"mobx-state-tree":' package-lock.json | tail -n 1 | awk -F: '{ print $2 }' | sed 's/[", ]//g')
echo "The installed version of mobx-state-tree is $mst_version"
npm run build
echo -e "\nRunning the node tests, this may take a while...\n"
rm -rf ./results/node-results.csv
node ./build/index.node.bundle.js | tee ./results/"$mst_version"-"$now"-node-results.csv

