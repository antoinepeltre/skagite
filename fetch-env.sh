#!/bin/bash

# URL du fichier brut GitHub Gist contenant les variables d'environnement
ENV_URL="https://gist.githubusercontent.com/antoinepeltre/d8a0ac8f86e226183681ddbbbd2825d2/raw/18dbd71c748f75055ec1e06614e38068de861346/env.json"

# Récupérer le contenu du Gist et l'afficher avant de l'écrire dans .env
echo "Fetching environment variables from Gist..."
ENV_VARS=$(curl -s $ENV_URL)

# Vérifiez si le fichier .env existe déjà
if [ -f .env ]; then
  echo ".env file already exists."
else
  # Si le fichier .env n'existe pas, le créer et injecter les variables
  echo "Creating .env file and saving environment variables..."

  # Vérifiez si le contenu a bien été récupéré
  if [ -z "$ENV_VARS" ]; then
    echo "Failed to fetch environment variables from Gist."
    exit 1
  fi

  # Écrire le contenu récupéré dans le fichier .env
  echo "$ENV_VARS" > .env

  # Vérifier si le fichier .env a bien été créé
  if [ ! -f .env ]; then
    echo "Failed to create .env file."
    exit 1
  else
    echo ".env file created successfully."
  fi
fi
