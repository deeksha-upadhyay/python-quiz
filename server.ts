import express from 'express';
import { createServer as createViteServer } from 'vite';
import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pythonPath = '/usr/bin/python3';
try {
  const foundPath = execSync('command -v python3 || command -v python').toString().trim();
  if (foundPath) {
    pythonPath = foundPath;
  }
} catch (e) {
  console.error('Could not find python path dynamically, using default:', pythonPath);
}

// Fallback check: if the path doesn't exist, try common locations
if (!fs.existsSync(pythonPath)) {
  const commonPaths = ['/usr/bin/python3', '/usr/local/bin/python3', '/usr/bin/python', '/usr/local/bin/python'];
  for (const p of commonPaths) {
    if (fs.existsSync(p)) {
      pythonPath = p;
      break;
    }
  }
}

async function startServer() {
  console.log('Server starting...');
  console.log('PATH:', process.env.PATH);
  console.log('Python Path:', pythonPath);
  
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route to run Python code
  app.post('/api/run-python', (req, res) => {
    const { code } = req.body;

    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }

    if (!fs.existsSync(pythonPath)) {
      return res.json({ output: '', error: `System Error: Python executable not found at ${pythonPath}` });
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

    let pythonProcess;
    try {
      pythonProcess = spawn(pythonPath, ['-c', code]);
    } catch (err) {
      clearTimeout(timeout);
      return res.json({ output: '', error: `System Error: Failed to spawn Python process. (${err instanceof Error ? err.message : String(err)})` });
    }

    let output = '';
    let error = '';

    const timeout = setTimeout(() => {
      pythonProcess.kill();
      if (!res.headersSent) {
        res.json({ output, error: 'Execution Timed Out (Max 5 seconds)' });
      }
    }, 5000);

    pythonProcess.on('error', (err) => {
      clearTimeout(timeout);
      if (!res.headersSent) {
        res.json({ output: '', error: `System Error: Could not start Python at ${pythonPath}. (${err.message})` });
      }
    });

    // Provide an empty string to stdin to prevent hanging on input()
    pythonProcess.stdin.write('\n');
    pythonProcess.stdin.end();

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
