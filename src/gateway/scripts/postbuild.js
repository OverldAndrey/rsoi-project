const fs = require('fs');

fs.cp('./package.json', './dist/package.json', (err) =>
    err ? console.error(err) : console.log('Copied package.json'));
fs.cp('./package-lock.json', './dist/package-lock.json', (err) =>
    err ? console.error(err) : console.log('Copied package-lock.json'));
