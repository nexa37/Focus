const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');

if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory does not exist.');
  process.exit(1);
}

const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('Error: dist/index.html does not exist.');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// All client-side SPA routes that might be accessed directly or bookmarked/added to home screen
const routes = ['dashboard', 'app', 'login', 'signup'];

routes.forEach((route) => {
  // 1. Directory with index.html (/dashboard/index.html) -> standard for static servers
  const routeDir = path.join(distDir, route);
  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }
  fs.writeFileSync(path.join(routeDir, 'index.html'), indexHtml);

  // 2. Clean URL fallback (/dashboard.html) -> for servers looking for .html extensions
  const routeHtml = path.join(distDir, `${route}.html`);
  // If app.html already exists as preview widget, don't overwrite it
  if (route !== 'app' || !fs.existsSync(routeHtml)) {
    fs.writeFileSync(routeHtml, indexHtml);
  }
});

// 3. Fallback 404.html -> widely used by static hosts (Cloud Run, GitHub Pages, Netlify, Cloudflare Pages)
fs.writeFileSync(path.join(distDir, '404.html'), indexHtml);

// 4. _redirects for Netlify / Render static hosting
fs.writeFileSync(path.join(distDir, '_redirects'), '/*    /index.html   200\n');

// 5. static.json for Heroku / Dokku / Static buildpacks
const staticConfig = {
  root: 'dist',
  clean_urls: true,
  routes: {
    '/**': 'index.html'
  }
};
fs.writeFileSync(path.join(distDir, 'static.json'), JSON.stringify(staticConfig, null, 2));

console.log('Successfully generated static route fallbacks for:', routes.join(', '), '+ 404.html');
