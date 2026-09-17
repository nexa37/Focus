const fs = require('fs');
const code = fs.readFileSync('dist/assets/index-DAN9b0Lq.js', 'utf8');
const matches = code.match(/title:"[^"]+",desc:"[^"]+"/g);
console.log(matches);
