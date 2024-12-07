FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install -g @angular/cli

RUN npm install

# Donner les permissions d'exécution au script fetch-env.sh
RUN chmod +x ./fetch-env.sh

# Exécuter le script pour récupérer les variables d'environnement
RUN ./fetch-env.sh

COPY . .

# Nous ne passons plus par dotenv/config ici car le fichier .env est généré par GitHub Actions
RUN node environment-variables.js

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]
