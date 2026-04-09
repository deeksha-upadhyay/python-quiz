import express from 'express';
import { createServer as createViteServer } from 'vite';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to run Python code
  app.post('/api/run-python', (req, res) => {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    // Basic security: check for some dangerous imports
    const dangerousKeywords = ['os', 'sys', 'subprocess', 'shutil', 'socket', 'requests', 'urllib'];
    const hasDangerous = dangerousKeywords.some(keyword => 
      new RegExp(`\\bimport\\s+${keyword}\\b|\\bfrom\\s+${keyword}\\s+import\\b`).test(code)
    );

    if (hasDangerous) {
      return res.json({ 
        output: '', 
        error: 'Security Alert: Importing system modules is not allowed in this learning environment!' 
      });
    }

    const pythonProcess = spawn('python3', ['-c', code]);

    pythonProcess.on('error', (err) => {
      clearTimeout(timeout);
      if (!res.headersSent) {
        res.json({ output: '', error: `System Error: Could not start Python. (${err.message})` });
      }
    });

    // Provide an empty string to stdin to prevent hanging on input()
    pythonProcess.stdin.write('\n');
    pythonProcess.stdin.end();

    let output = '';
    let error = '';

    const timeout = setTimeout(() => {
      pythonProcess.kill();
      res.json({ output, error: 'Execution Timed Out (Max 5 seconds)' });
    }, 5000);

    pythonProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      clearTimeout(timeout);
      res.json({ output, error });
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
