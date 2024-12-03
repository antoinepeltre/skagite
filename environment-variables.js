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

// Ajoute des logs pour vérifier les variables d'environnement
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);

const environment = `
export const environment = {
  production: true,
  supabaseUrl: '${process.env.SUPABASE_URL}',
  supabaseKey: '${process.env.SUPABASE_KEY}'
};
`;

// Modifie le chemin cible pour éviter le double 'src'
const targetPath = path.join(__dirname, 'src/environments/environment.prod.ts');

// Ajoute un log pour vérifier que le chemin cible est correct
console.log('Target Path:', targetPath);

fs.writeFileSync(targetPath, environment, (err) => {
  if (err) {
    console.error('Error writing environment file', err);
  } else {
    console.log('Environment file generated successfully');
  }
});

