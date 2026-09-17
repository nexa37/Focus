const fs = require('fs');
let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('</motion.div>')) {
    // Check if the corresponding opening tag was a div or motion.div
    // This is hard to do without a full parser, but let's just do a manual line replacement for known tags
  }
}
