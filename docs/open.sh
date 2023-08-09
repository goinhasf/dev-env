#!/bin/bash

ROOT="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

function cleanup() {
  echo "Cleaning up..."
  docker container stop $CONTAINER_ID
  docker container rm $CONTAINER_ID
}

echo $ROOT

trap cleanup SIGINT

CONTAINER_ID=$(docker run -d -p 8100:8080 -v $ROOT:/usr/local/structurizr structurizr/lite)
echo "Starting...."
sleep 5

echo "Opening browser..."
open -W http://localhost:8100

