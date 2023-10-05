#!/bin/bash

# Create a timestamp based run id
run_id=$(date +%s)

# We can either run all of the scenarios in a directory or specify scenarios to run.
# So all_scenarios_in_directory is a variable that holds all of the scenarios in a directory.
all_scenarios_in_directory=($(find ./build/node -name "*.js"))

# And specific_scenarios is a variable that holds specific scenarios to run.
specific_scenarios=(
    "./build/node/create-1k-model-instances.bundle.js"
    "./build/node/create-10k-model-instances.bundle.js"
)

# Choose what you want for scenarios_to_run - default is all scenarios in the directory
scenarios_to_run=("${all_scenarios_in_directory[@]}")  
# Alternatively, you can use specific_scenarios if you prefer. Uncomment the line below and comment out the line above.
# scenarios_to_run=("${specific_scenarios[@]}")

# Then run each of the scenarios locally from the ./src/node/scenarios directory,
# For each one - listen to stdout and append it to ./results/run_id.csv. There should only be one line of output per scenario.
for file in "${scenarios_to_run[@]}"; do
    echo "$file"
    gtime /Users/tylerwilliams/build_release/bin/node-hermes ./build/node/"$(basename "$file")"
done
