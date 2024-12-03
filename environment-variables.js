// const fs = require('fs');
// const path = require('path');
// const dotenv = require('dotenv');

// // Charger les variables d'environnement à partir du fichier .env
// dotenv.config();

// // Spécifie où se trouve ton fichier environment.prod.ts
// const environmentFilePath = path.join(__dirname, 'src', 'environments', 'environment.ts');

// // Lis le contenu du fichier environment.prod.ts
// let environmentFileContent = fs.readFileSync(environmentFilePath, 'utf-8');

// // Remplace les placeholders dans environment.prod.ts par les valeurs des variables d'environnement
// environmentFileContent = environmentFileContent.replace(
//   'supabaseUrl: \'\',',
//   `supabaseUrl: '${process.env.SUPABASE_URL}',`
// );

// environmentFileContent = environmentFileContent.replace(
//   'supabaseKey: \'\',',
//   `supabaseKey: '${process.env.SUPABASE_KEY}',`
// );

// // Sauvegarde les modifications dans le fichier environment.prod.ts
// fs.writeFileSync(environmentFilePath, environmentFileContent);

// console.log('Les variables d\'environnement ont été injectées avec succès.');

const fs = require('fs');
const path = require('path');

// Assurez-vous que les variables d'environnement sont définies
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("Les variables d'environnement SUPABASE_URL et SUPABASE_KEY sont manquantes.");
  process.exit(1); // Quitte le processus si les variables sont manquantes
}

// Crée le contenu du fichier environment.prod.ts
const environment = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_KEY}'
};
`;

// Chemin du fichier de destination
const targetPath = path.join(__dirname, 'src/environments/environment.prod.ts');

// Log du chemin du fichier pour vérifier
console.log('Chemin du fichier environment.prod.ts :', targetPath);

// Crée le dossier 'environments' si nécessaire
const dirPath = path.dirname(targetPath);
if (!fs.existsSync(dirPath)) {
  console.log(`Le dossier ${dirPath} n'existe pas. Création du dossier...`);
  fs.mkdirSync(dirPath, { recursive: true }); // Crée le dossier si nécessaire
} else {
  console.log(`Le dossier ${dirPath} existe déjà.`);
}

// Log de l'existence du fichier avant l'écriture
if (fs.existsSync(targetPath)) {
  console.log(`Le fichier ${targetPath} existe déjà.`);
} else {
  console.log(`Le fichier ${targetPath} n'existe pas et sera créé.`);
}

// Écrit le contenu dans le fichier de destination
fs.writeFileSync(targetPath, environment, (err) => {
  if (err) {
    console.error('Erreur lors de l\'écriture du fichier d\'environnement', err);
    process.exit(1); // Quitte si l'écriture échoue
  } else {
    console.log('Fichier d\'environnement généré avec succès');
  }
});
