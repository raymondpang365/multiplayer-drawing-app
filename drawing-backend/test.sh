#!/bin/bash

if [ ! -f .env.$1 ]; then
    echo .env.$1: No such file
    exit 1
fi

set -o allexport && source .env.$1 && set +o allexport
if [ -z "$2" ];
then
  mvn test
else
  mvn test -Dtest="$2"
fi