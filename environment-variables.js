const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Charger les variables d'environnement à partir du fichier .env
dotenv.config();

// Spécifie où se trouve ton fichier environment.prod.ts
const environmentFilePath = path.join(__dirname, 'environments', 'environment.ts');

// Lis le contenu du fichier environment.prod.ts
let environmentFileContent = fs.readFileSync(environmentFilePath, 'utf-8');

// Remplace les placeholders dans environment.prod.ts par les valeurs des variables d'environnement
environmentFileContent = environmentFileContent.replace(
  'supabaseUrl: \'\',',
  `supabaseUrl: '${process.env.SUPABASE_URL}',`
);

environmentFileContent = environmentFileContent.replace(
  'supabaseKey: \'\',',
  `supabaseKey: '${process.env.SUPABASE_KEY}',`
);

// Sauvegarde les modifications dans le fichier environment.prod.ts
fs.writeFileSync(environmentFilePath, environmentFileContent);

console.log('Les variables d\'environnement ont été injectées avec succès.');
