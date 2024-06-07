#!/bin/bash

while true
do
  cd src
  npx playwright test
  sleep 10800 # Wait for 3 hours before running the tests again
done