import React, { useState, useRef } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CodeEditorProps {
  initialCode: string;
  solution: string;
  onSuccess: () => void;
}

export default function CodeEditor({ initialCode, solution, onSuccess }: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hint, setHint] = useState('');
  const pyodideRef = useRef<any>(null);

  const runCode = async () => {
    setIsRunning(true);
    setError('');
    setOutput('');
    setHint('');

    try {
      if (!pyodideRef.current) {
        // @ts-ignore
        pyodideRef.current = await window.loadPyodide();
      }

      const pyodide = pyodideRef.current;
      
      // Redirect stdout to capture print() calls
      let capturedOutput = '';
      pyodide.setStdout({
        batched: (text: string) => {
          capturedOutput += text + '\n';
        }
      });

      try {
        await pyodide.runPythonAsync(code);
        setOutput(capturedOutput.trim());
        
        // Check if solution matches
        const solutionRegex = new RegExp(solution, 'i');
        if (solutionRegex.test(code)) {
          setIsSuccess(true);
          onSuccess();
        }
      } catch (err: any) {
        const errMsg = err.message || String(err);
        setError(errMsg);
        generateHint(errMsg, code);
      }
    } catch (err) {
      setError('Failed to initialize Python environment in the browser.');
      console.error(err);
    } finally {
      setIsRunning(false);
    }
  };

  const generateHint = (err: string, currentCode: string) => {
    if (err.includes('SyntaxError')) {
      if (err.includes('unterminated string literal')) setHint('Check your quotes! Did you forget to close one?');
      else if (err.includes('expected \':\'')) setHint('Did you forget a colon (:) at the end of the line?');
      else setHint('Check your spelling and punctuation. Python is very picky!');
    } else if (err.includes('NameError')) {
      setHint('Check your variable names. Did you spell them correctly?');
    } else if (!currentCode.includes('print')) {
      setHint('Try using the print() function to show your result!');
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput('');
    setError('');
    setIsSuccess(false);
    setHint('');
  };

  return (
    <div className="space-y-4">
      <div className="relative group">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-48 bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-lg resize-none focus:ring-4 focus:ring-blue-500/20 outline-none transition-all"
          placeholder="# Type your Python code here..."
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={resetCode}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <button
          onClick={runCode}
          disabled={isRunning || isSuccess}
          className={`flex-1 sm:flex-none px-8 py-3 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-lg ${
            isSuccess 
              ? 'bg-green-500 text-white cursor-default' 
              : 'bg-yellow-400 hover:bg-yellow-500 text-slate-900 shadow-yellow-200 active:scale-95'
          }`}
        >
          {isRunning ? (
            <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
          ) : isSuccess ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Correct!
            </>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" />
              Run Code
            </>
          )}
        </button>

        <AnimatePresence>
          {hint && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1 bg-blue-50 text-blue-700 px-4 py-3 rounded-xl border border-blue-100 flex items-center gap-2 text-sm font-bold"
            >
              <HelpCircle className="w-5 h-5 flex-shrink-0" />
              {hint}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Output</h5>
          <div className="bg-slate-100 min-h-[100px] p-4 rounded-xl font-mono text-slate-700 whitespace-pre-wrap border border-slate-200">
            {output || (isRunning ? 'Running...' : 'No output yet.')}
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Errors</h5>
          <div className={`min-h-[100px] p-4 rounded-xl font-mono whitespace-pre-wrap border ${
            error ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-200'
          }`}>
            {error ? (
              <div className="flex gap-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            ) : 'No errors! Great job.'}
          </div>
        </div>
      </div>
    </div>
  );
}
