const fs = require('fs');
const esbuild = require('esbuild');

function buildApp() {
  let code = fs.readFileSync('src/app-standalone.jsx', 'utf8');
  code = code + `\nimport ReactDOM from 'react-dom/client';\nconst rootEl = document.getElementById('root');\nif (rootEl) { ReactDOM.createRoot(rootEl).render(<FocusFlow />); }\n`;
  
  fs.writeFileSync('src/app-entry.jsx', code);

  esbuild.buildSync({
    entryPoints: ['src/app-entry.jsx'],
    bundle: true,
    minify: true,
    target: 'es2020',
    outfile: 'public/app.js',
    logLevel: 'info',
  });
  console.log('Successfully bundled public/app.js with React 19');
}

buildApp();
