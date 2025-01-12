const fs = require('fs');

fs.cp('./package.json', './dist/package.json', (err) =>
    err ? console.error(err) : console.log('Copied package.json'));
fs.cp('./package-lock.json', './dist/package-lock.json', (err) =>
    err ? console.error(err) : console.log('Copied package-lock.json'));
fs.rmSync('./dist/config/configuration.js');
fs.renameSync(
    './dist/config/configuration.prod.js',
    './dist/config/configuration.js',
);
