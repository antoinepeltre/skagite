const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// Vérification des variables d'environnement
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("Les variables d'environnement SUPABASE_URL et SUPABASE_KEY sont manquantes.");
  process.exit(1);
}

// Contenu des fichiers d'environnement
const envFileProd = `export const environment = {
    production: true,
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}',
};
`;

const envFileDev = `export const environment = {
    production: false,
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}',
};
`;

// Chemins des fichiers
const environmentsDir = path.join(__dirname, 'src/environments');
const targetPathProd = path.join(environmentsDir, 'environment.prod.ts');
const targetPathDev = path.join(environmentsDir, 'environment.ts');

// Vérification et création du dossier environments si nécessaire
if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
  console.log(successColor, `${checkSign} Directory 'environments' created.`);
}

// Écriture des fichiers environment.prod.ts
fs.writeFile(targetPathProd, envFileProd, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.prod.ts`);
  }
});

// Écriture des fichiers environment.ts
fs.writeFile(targetPathDev, envFileDev, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.ts`);
  }
});
