#!/bin/bash

# Create a timestamp based run id
run_id=$(date +%s)

# We can either run all of the scenarios in a directory or specify specific scenarios to run.
# So all_scenarios_in_directory is a variable that holds all of the scenarios in a directory.
all_scenarios_in_directory=($(find ./build/ -name "*.js"))

specific_scenarios=(
    "./build/create-1k-model-instances.bundle.js"
    "./build/create-10k-model-instances.bundle.js"
)

# Choose what you want for scenarios_to_run - default is all scenarios in the directory
scenarios_to_run=("${all_scenarios_in_directory[@]}")  # Properly copy the array

# echo the number of scenarios to run
echo "Number of scenarios to run: ${#scenarios_to_run[@]}"

# Alternatively, you can specify specific scenarios to run
# scenarios_to_run=("${specific_scenarios[@]}")

# Append the csv headers to ./results/run_id.csv
echo "Appending csv headers to ./results/node-$run_id.csv"
echo "scenario,time_ms,memory_mb" >> "./results/node-$run_id.csv"

# Then run each of the scenarios locally from the ./src/node/scenarios directory,
# For each one - listen to stdout and append it to ./results/run_id.csv. There should only be one line of output per scenario.
for file in "${scenarios_to_run[@]}"; do
    echo "Running scenario: $file"
    node ./build/"$(basename "$file")" >> "./results/node-$run_id.csv" 
done