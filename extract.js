const fs = require('fs');
const code = fs.readFileSync('dist/assets/index-DAN9b0Lq.js', 'utf8');

// The JS file contains things like:
// const features = [{title: "...", desc: "..."}, ...]
// We can just dump all strings that look like titles or descs.

const matches = code.match(/\{title:"[^"]+",desc:"[^"]+"/g);
console.log(matches);
