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

// Contenu du fichier d'environnement
const envFile = `export const environment = {
    production: true,
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}',
};
`;

// Chemin du fichier cible
const environmentsDir = path.join(__dirname, 'src/environments');
const targetPath = path.join(environmentsDir, 'environment.prod.ts');

// Vérification et création du dossier environments si nécessaire
if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
  console.log(successColor, `${checkSign} Directory 'environments' created.`);
}

// Écriture du fichier environment.prod.ts
fs.writeFile(targetPath, envFile, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.prod.ts`);
  }
});
