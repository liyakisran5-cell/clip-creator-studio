import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs";

const serverCjs = `
const http = require("http");
const fs = require("fs");
const path = require("path");

const DIST_DIR = path.join(__dirname);
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  ".html": "text/html",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".txt": "text/plain",
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split("?")[0];
  const filePath = path.join(DIST_DIR, urlPath);

  const tryServeFile = (fp, fallbackToIndex) => {
    fs.stat(fp, (err, stat) => {
      if (!err && stat.isFile()) {
        const ext = path.extname(fp).toLowerCase();
        const contentType = MIME_TYPES[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        fs.createReadStream(fp).pipe(res);
      } else if (!err && stat.isDirectory()) {
        tryServeFile(path.join(fp, "index.html"), fallbackToIndex);
      } else if (fallbackToIndex) {
        const indexPath = path.join(DIST_DIR, "index.html");
        fs.readFile(indexPath, (readErr, data) => {
          if (readErr) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Not Found");
          } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        });
      } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
      }
    });
  };

  tryServeFile(filePath, true);
});

server.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
`;

function generateServerPlugin(): Plugin {
  return {
    name: "generate-server-cjs",
    closeBundle() {
      fs.writeFileSync(path.resolve(__dirname, "dist/index.cjs"), serverCjs);
    },
  };
}

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5000,
    allowedHosts: true,
    hmr: {
      overlay: false,
    },
  },
  cacheDir: path.resolve(__dirname, 'node_modules/.vite'),
  plugins: [react(), generateServerPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    force: true,
  },
});
