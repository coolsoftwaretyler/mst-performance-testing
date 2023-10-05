#!/bin/bash

# Create a timestamp based run id
run_id=$(date +%s)

# We can either run all of the scenarios in a directory or specify specific scenarios to run.
# So all_scenarios_in_directory is a variable that holds all of the scenarios in a directory.
all_scenarios_in_directory=($(find ./src/scenarios -name "*.js"))

specific_scenarios=(
    "./src/scenarios/create-1k-model-instances.js"
    "./src/scenarios/create-10k-model-instances.js"
)

# Choose what you want for scenarios_to_run - default is all scenarios in the directory
scenarios_to_run=("${all_scenarios_in_directory[@]}")  # Properly copy the array

# echo the number of scenarios to run
echo "Number of scenarios to run: ${#scenarios_to_run[@]}"

# Alternatively, you can specify specific scenarios to run
# scenarios_to_run=("${specific_scenarios[@]}")

# For the scenarios to run, we actually want to copy them over into ./src/node/scenarios so we can run them from their locally
# First, remove any JavaScript files in the ./src/node/scenarios directory

echo "Removing any JavaScript files in ./src/node/scenarios"
rm -rf ./src/node/scenarios/*.js

# Then copy over the scenarios to run into the ./src/node/scenarios directory
for file in "${scenarios_to_run[@]}"; do
    cp "$file" ./src/node/scenarios
done

# Then let's make sure we have the dependencies up to date
echo "Installing dependencies for node"
cd ./src/node
npm install
cd ../..

# Append the csv headers to ./results/run_id.csv
echo "Appending csv headers to ./results/node-$run_id.csv"
echo "scenario,time_ms,memory_mb" >> "./results/node-$run_id.csv"

# Then run each of the scenarios locally from the ./src/node/scenarios directory,
# For each one - listen to stdout and append it to ./results/run_id.csv. There should only be one line of output per scenario.
for file in "${scenarios_to_run[@]}"; do
    echo "Running scenario: $file"
    node ./src/node/scenarios/"$(basename "$file")" >> "./results/node-$run_id.csv" 
done

# Now clean up the files and remove them
echo "Removing any JavaScript files in ./src/node/scenarios"
rm -rf ./src/node/scenarios/*.js