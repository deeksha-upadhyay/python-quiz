import { spawn } from 'child_process';

const p = spawn('python3', ['--version']);
p.stdout.on('data', (data) => console.log('STDOUT:', data.toString()));
p.stderr.on('data', (data) => console.log('STDERR:', data.toString()));
p.on('error', (err) => console.error('ERROR:', err.message));
p.on('close', (code) => console.log('CLOSE:', code));
