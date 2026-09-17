const fs = require('fs');
let content = fs.readFileSync('src/pages/Landing.tsx', 'utf8');

// How it works cards
content = content.replace(
  /<motion\.div[\s\S]*?key={i}[\s\S]*?className="bg-white\/10 backdrop-blur-xl border border-white\/10 rounded-3xl p-7 sm:p-8 hover:bg-white\/15 hover:border-blue-500\/30 transition-all flex flex-col justify-between group shadow-xl"/g,
  '<div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-8 hover:bg-white/15 hover:border-blue-500/30 transition-all flex flex-col justify-between group shadow-xl"'
);

// Benefits small cards
content = content.replace(
  /<motion\.div[\s\S]*?key={i}[\s\S]*?className="bg-white\/10 backdrop-blur-xl border border-white\/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-center hover:bg-white\/15 hover:border-purple-500\/40 transition-all shadow-lg"/g,
  '<div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-center hover:bg-white/15 hover:border-purple-500/40 transition-all shadow-lg"'
);

// Benefits visual cards
content = content.replace(
  /<motion\.div[\s\S]*?key={i}[\s\S]*?className="aspect-video sm:aspect-square bg-white\/10 backdrop-blur-xl border border-white\/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex items-end relative overflow-hidden group hover:border-blue-500\/40 transition-all shadow-xl"/g,
  '<div key={i} className="aspect-video sm:aspect-square bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-7 flex items-end relative overflow-hidden group hover:border-blue-500/40 transition-all shadow-xl"'
);

// About mission cards
content = content.replace(
  /<motion\.div[\s\S]*?key={idx}[\s\S]*?className="p-6 sm:p-7 rounded-3xl bg-white\/10 backdrop-blur-xl border border-white\/10 hover:border-blue-500\/30 hover:bg-white\/15 transition-all shadow-xl flex items-start gap-5"/g,
  '<div key={idx} className="p-6 sm:p-7 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 hover:border-blue-500/30 hover:bg-white/15 transition-all shadow-xl flex items-start gap-5"'
);

// FAQ accordion items
content = content.replace(
  /<motion\.div[\s\S]*?key={index}[\s\S]*?className="rounded-2xl border border-white\/10 bg-white\/10 backdrop-blur-xl overflow-hidden transition-all hover:border-white\/20"/g,
  '<div key={index} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl overflow-hidden transition-all hover:border-white/20"'
);

fs.writeFileSync('src/pages/Landing.tsx', content);
