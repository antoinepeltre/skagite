#!/bin/bash

# URL du fichier brut GitHub Gist contenant les variables d'environnement
ENV_URL="https://gist.githubusercontent.com/antoinepeltre/d8a0ac8f86e226183681ddbbbd2825d2/raw/18dbd71c748f75055ec1e06614e38068de861346/env.json"

# Récupérer le contenu du Gist et l'afficher avant de l'écrire dans .env
echo "Fetching environment variables from Gist..."
curl -s $ENV_URL

# Vérifiez si le fichier .env existe déjà
if [ -f .env ]; then
  echo ".env file already exists."
else
  # Récupérez le fichier brut et enregistrez-le en tant que .env
  echo "Saving environment variables to .env..."
  curl -s $ENV_URL -o .env

  # Vérifiez si le fichier .env a été correctement téléchargé
  if [ ! -f .env ]; then
    echo "Failed to fetch environment variables."
    exit 1
  else
    echo ".env file created successfully."
  fi
fi
