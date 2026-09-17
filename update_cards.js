const fs = require('fs');
let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

const replacements = [
  {
    regex: /<motion\.div\s+key={i}\s+initial={{ opacity: 0, y: 15 }}\s+whileInView={{ opacity: 1, y: 0 }}\s+viewport={{ once: false, margin: "0px 0px -25% 0px" }}\s+transition={{ delay: i \* 0\.1 }}\s+className="bg-white\/10 backdrop-blur-xl border border-white\/10 rounded-3xl p-7 sm:p-8/g,
    replace: '<div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-8'
  },
  {
    regex: /<motion\.div\s+key={i}\s+initial={{ opacity: 0, scale: 0\.96 }}\s+whileInView={{ opacity: 1, scale: 1 }}\s+viewport={{ once: false, margin: "0px 0px -25% 0px" }}\s+transition={{ delay: i \* 0\.08, duration: 0\.4 }}\s+className="bg-white\/10 backdrop-blur-xl border border-white\/10 rounded-2xl p-6 sm:p-8/g,
    replace: '<div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8'
  },
  {
    regex: /<motion\.div\s+key={i}\s+initial={{ opacity: 0, y: 20 }}\s+whileInView={{ opacity: 1, y: 0 }}\s+viewport={{ once: false, margin: "0px 0px -25% 0px" }}\s+transition={{ delay: i \* 0\.08, duration: 0\.5 }}\s+className="aspect-video sm:aspect-square bg-white\/10 backdrop-blur-xl border border-white\/10/g,
    replace: '<div key={i} className="aspect-video sm:aspect-square bg-white/10 backdrop-blur-xl border border-white/10'
  },
  {
    regex: /<motion\.div\s+key={idx}\s+initial={{ opacity: 0, x: 15 }}\s+whileInView={{ opacity: 1, x: 0 }}\s+viewport={{ once: false, margin: "0px 0px -25% 0px" }}\s+transition={{ delay: idx \* 0\.1 }}\s+className="p-6 sm:p-7/g,
    replace: '<div key={idx} className="p-6 sm:p-7'
  },
  {
    regex: /<motion\.div\s+key={index}\s+initial={{ opacity: 0, y: 10 }}\s+whileInView={{ opacity: 1, y: 0 }}\s+viewport={{ once: false, margin: "0px 0px -25% 0px" }}\s+transition={{ delay: index \* 0\.05 }}\s+className="rounded-2xl border border-white\/10 bg-white\/10 backdrop-blur-xl/g,
    replace: '<div key={index} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl'
  }
];

replacements.forEach(r => {
  content = content.replace(r.regex, r.replace);
});

// Since we replaced the opening tags with div, we need to manually fix the corresponding closing tags.
// It might be tricky, let's just use string replacement for all </motion.div> that match our structure.
// Actually, it's easier to just do it via exact line replacements or simple matches.

fs.writeFileSync('src/pages/Landing.tsx', content);
