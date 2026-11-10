// Zero-Dependency Production Static Server for Main Sakoonsay
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4300;
const DIST_DIR = path.join(__dirname, 'dist', 'main-sakoonsay', 'browser');

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  let filePath = path.join(DIST_DIR, reqPath);

  // If file doesn't exist, fallback to index.html (SPA routing)
  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(DIST_DIR, 'index.html');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end(`Sanctuary Server Error: ${readErr.code}`);
      } else {
        res.writeHead(200, {
          'Content-Type': contentType,
          'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000'
        });
        res.end(content);
      }
    });
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✨ ======================================================== ✨`);
  console.log(`🌸 SAKOONSAY - UNIFIED SACRED SANCTUARY`);
  console.log(`🌐 Server running serenely at: http://localhost:${PORT}`);
  console.log(`🌐 Direct IPv4 URL: http://127.0.0.1:${PORT}`);
  console.log(`🧠 Sister Portal 1 (Psychiatrist): https://gentle-kringle-399d14.netlify.app/`);
  console.log(`🪷 Sister Portal 2 (Sakoon-Temple): https://skoonsay.netlify.app/`);
  console.log(`✨ ======================================================== ✨\n`);
});

