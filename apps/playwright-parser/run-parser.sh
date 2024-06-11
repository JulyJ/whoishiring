#!/usr/bin/bash

# Check if the script received an argument
if [ -z "$1" ]; then
  echo "Please provide a test type (e.g., 'greenhouse-parser' or 'hn-parser')."
  exit 1
fi

test=$1

while true
do
    
  if [ "$test" == "greenhouse-parser" ]; then
    npx playwright test "$test"
    sleep 10800 # Wait for 3 hours before running the tests again
  elif [ "$test" == "hn-parser" ]; then
    npx playwright test "$test"
    sleep 180 # Wait for 3 minutes before running the tests again
  else
    echo "Invalid test type. Please provide 'greenhouse-parser' or 'hn-parser'."
    exit 1
  fi
  
done

