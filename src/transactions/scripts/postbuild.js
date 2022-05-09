const fs = require('fs');

fs.cp('./ormconfig.prod.json', './dist/ormconfig.json', (err) =>
    err ? console.error(err) : console.log('Copied ormconfig.json'));
fs.cp('./package.json', './dist/package.json', (err) =>
    err ? console.error(err) : console.log('Copied package.json'));
fs.cp('./package-lock.json', './dist/package-lock.json', (err) =>
    err ? console.error(err) : console.log('Copied package-lock.json'));
