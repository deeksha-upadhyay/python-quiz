import express from 'express';
import { createServer as createViteServer } from 'vite';
import { spawn, execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let pythonPath = 'python3'; // Default to command name
console.log('Starting Python path discovery...');
try {
  const foundPath = execSync('command -v python3 || command -v python').toString().trim();
  if (foundPath) {
    pythonPath = foundPath;
    console.log('Found Python path via command -v:', pythonPath);
  }
} catch (e) {
  console.log('command -v failed, trying common absolute paths...');
  // If command -v fails, try common absolute paths
  const commonPaths = ['/usr/bin/python3', '/usr/local/bin/python3', '/usr/bin/python', '/usr/local/bin/python'];
  for (const p of commonPaths) {
    if (fs.existsSync(p)) {
      pythonPath = p;
      console.log('Found Python path via fs.existsSync:', pythonPath);
      break;
    }
  }
}
console.log('Final Python Path selected:', pythonPath);

async function startServer() {
  console.log('Server starting...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('PATH:', process.env.PATH);
  console.log('Initial Python Path:', pythonPath);
  
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Debug route to inspect environment
  app.get('/api/debug', (req, res) => {
    let foundPython = 'Not found';
    try {
      foundPython = execSync('which python3 || which python').toString().trim();
    } catch (e) {
      foundPython = 'Error finding python: ' + (e instanceof Error ? e.message : String(e));
    }

    res.json({
      nodeEnv: process.env.NODE_ENV,
      path: process.env.PATH,
      pythonPath,
      foundPython,
      exists: fs.existsSync(pythonPath),
      cwd: process.cwd(),
      filesInBin: fs.existsSync('/usr/bin') ? fs.readdirSync('/usr/bin').filter(f => f.includes('python')) : []
    });
  });

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

    let pythonProcess;
    try {
      pythonProcess = spawn(pythonPath, ['-c', code]);
    } catch (err) {
      // Fallback to 'python' if 'python3' or absolute path fails
      try {
        pythonProcess = spawn('python', ['-c', code]);
      } catch (err2) {
        clearTimeout(timeout);
        return res.json({ output: '', error: `System Error: Failed to spawn Python process. (${err instanceof Error ? err.message : String(err)})` });
      }
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
      if (err.message.includes('ENOENT') && pythonPath !== 'python') {
        // Try fallback to 'python'
        console.log('python3 failed, trying python fallback...');
        const fallbackProcess = spawn('python', ['-c', code]);
        
        fallbackProcess.on('error', (err2) => {
          clearTimeout(timeout);
          if (!res.headersSent) {
            res.json({ output: '', error: `System Error: Could not start Python (tried ${pythonPath} and python). (${err2.message})` });
          }
        });

        setupProcessHandlers(fallbackProcess, res, timeout);
      } else {
        clearTimeout(timeout);
        if (!res.headersSent) {
          res.json({ output: '', error: `System Error: Could not start Python at ${pythonPath}. (${err.message})` });
        }
      }
    });

    function setupProcessHandlers(proc, response, timer) {
      // Provide an empty string to stdin to prevent hanging on input()
      proc.stdin.write('\n');
      proc.stdin.end();

      proc.stdout.on('data', (data) => {
        output += data.toString();
      });

      proc.stderr.on('data', (data) => {
        error += data.toString();
      });

      proc.on('close', (code) => {
        clearTimeout(timer);
        if (!response.headersSent) {
          response.json({ output, error });
        }
      });
    }

    setupProcessHandlers(pythonProcess, res, timeout);
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
