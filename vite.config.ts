import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function weddingConfigApiPlugin(): Plugin {
  return {
    name: 'wedding-config-api',
    configureServer(server) {
      server.middlewares.use('/api/save-config', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const data = JSON.parse(body);
              const publicDir = path.resolve(__dirname, 'public');
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              const jsonPath = path.resolve(publicDir, 'wedding-config.json');
              fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');

              // If adminPin is present, also synchronize src/data/defaultWeddingConfig.ts
              if (data.config && data.config.adminPin) {
                const defaultConfigFile = path.resolve(__dirname, 'src/data/defaultWeddingConfig.ts');
                if (fs.existsSync(defaultConfigFile)) {
                  let content = fs.readFileSync(defaultConfigFile, 'utf-8');
                  content = content.replace(/adminPin:\s*['"][^'"]*['"]/, `adminPin: '${data.config.adminPin}'`);
                  fs.writeFileSync(defaultConfigFile, content, 'utf-8');
                }
              }

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, message: 'Saved to wedding-config.json and synchronized defaultWeddingConfig.ts' }));
            } catch (err: any) {
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), weddingConfigApiPlugin()],
  server: {
    port: 5173,
    host: true
  }
});
