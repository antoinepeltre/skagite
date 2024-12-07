FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

# Copier le script fetch-env.sh dans le conteneur
COPY fetch-env.sh ./fetch-env.sh

# Vérifier si le fichier existe dans l'image après la copie
RUN ls -l ./fetch-env.sh

# Donner les permissions d'exécution au script fetch-env.sh
RUN chmod +x ./fetch-env.sh

COPY .env .env

COPY . .

# Nous ne passons plus par dotenv/config ici car le fichier .env est généré par GitHub Actions
RUN node environment-variables.js

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
