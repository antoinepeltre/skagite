const fs = require('fs');
const path = require('path');
const successColor = '\x1b[32m%s\x1b[0m';
const checkSign = '\u{2705}';
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') });


if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) {
  console.error("Les variables d'environnement SUPABASE_URL et SUPABASE_KEY sont manquantes.");
  process.exit(1);
}


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


const environmentsDir = path.join(__dirname, 'src/environments');
const targetPathProd = path.join(environmentsDir, 'environment.prod.ts');
const targetPathDev = path.join(environmentsDir, 'environment.ts');


if (!fs.existsSync(environmentsDir)) {
  fs.mkdirSync(environmentsDir, { recursive: true });
  console.log(successColor, `${checkSign} Directory 'environments' created.`);
}


fs.writeFile(targetPathProd, envFileProd, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.prod.ts`);
  }
});


fs.writeFile(targetPathDev, envFileDev, (err) => {
  if (err) {
    console.error(err);
    throw err;
  } else {
    console.log(successColor, `${checkSign} Successfully generated environment.ts`);
  }
});
