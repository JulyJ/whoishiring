#!/bin/bash

while true
do
  npx playwright test
  sleep 180 # Wait for 3 minutes before running the tests again
done