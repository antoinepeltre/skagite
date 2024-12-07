#!/bin/bash

ENV_URL="https://gist.githubusercontent.com/antoinepeltre/d8a0ac8f86e226183681ddbbbd2825d2/raw/18dbd71c748f75055ec1e06614e38068de861346/env.json"


echo "Fetching environment variables from Gist..."
ENV_VARS=$(curl -s $ENV_URL)


if [ -f .env ]; then
  echo ".env file already exists."
else

  echo "Creating .env file and saving environment variables..."


  if [ -z "$ENV_VARS" ]; then
    echo "Failed to fetch environment variables from Gist."
    exit 1
  fi


  echo "$ENV_VARS" > .env


  if [ ! -f .env ]; then
    echo "Failed to create .env file."
    exit 1
  else
    echo ".env file created successfully."
  fi
fi
