const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, 'src/.env') });

// Vérifie que les variables sont bien chargées
console.log('SUPABASE_URL:', process.env.SUPABASE_URL);
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY);

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("Les variables d'environnement SUPABASE_URL et SUPABASE_KEY sont manquantes.");
  process.exit(1); // Arrêter si les variables sont manquantes
}

const envFile = `export const environment = {
    production: true,
    SUPABASE_URL: '${process.env.SUPABASE_URL}',
    SUPABASE_KEY: '${process.env.SUPABASE_KEY}',
};
`;

const targetPath = path.join(__dirname, 'src/environments/environment.prod.ts');

fs.writeFile(targetPath, envFile, (err) => {
    if (err) {
        console.error(err);
        throw err;
    } else {
        console.log(successColor, `${checkSign} Successfully generated environment.prod.ts`);
    }
});
