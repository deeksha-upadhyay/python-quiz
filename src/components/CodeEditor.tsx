import React, { useState, useRef, useEffect } from 'react';
import { Play, RotateCcw, CheckCircle2, AlertCircle, HelpCircle, Palette } from 'lucide-react';
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
  const [showCanvas, setShowCanvas] = useState(false);
  const pyodideRef = useRef<any>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const turtleStateRef = useRef({
    x: 150,
    y: 150,
    angle: 0,
    penDown: true,
    color: '#000000',
    size: 2
  });

  useEffect(() => {
    if (code.includes('import turtle')) {
      setShowCanvas(true);
    }
  }, [code]);

  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw center point
        ctx.fillStyle = '#e2e8f0';
        ctx.beginPath();
        ctx.arc(150, 150, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    turtleStateRef.current = {
      x: 150,
      y: 150,
      angle: 0,
      penDown: true,
      color: '#000000',
      size: 2
    };
  };

  const runCode = async () => {
    setIsRunning(true);
    setIsSuccess(false);
    setError('');
    setOutput('');
    setHint('');
    
    if (code.includes('import turtle')) {
      setShowCanvas(true);
      // Small delay to ensure canvas is rendered
      await new Promise(resolve => setTimeout(resolve, 100));
      resetCanvas();
    }

    try {
      if (!pyodideRef.current) {
        // @ts-ignore
        pyodideRef.current = await window.loadPyodide();
      }

      const pyodide = pyodideRef.current;
      
      // Mock input() using window.prompt
      await pyodide.runPythonAsync(`
import builtins
from js import window

def mocked_input(prompt=""):
    return window.prompt(prompt) or ""

builtins.input = mocked_input
      `);

      // Bridge for Turtle Graphics
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');

      if (ctx) {
        const turtleBridge = {
          forward: (distance: number) => {
            const state = turtleStateRef.current;
            const rad = (state.angle * Math.PI) / 180;
            const newX = state.x + distance * Math.cos(rad);
            const newY = state.y - distance * Math.sin(rad); // Canvas Y is inverted

            if (state.penDown) {
              ctx.beginPath();
              ctx.moveTo(state.x, state.y);
              ctx.lineTo(newX, newY);
              ctx.strokeStyle = state.color;
              ctx.lineWidth = state.size;
              ctx.lineCap = 'round';
              ctx.stroke();
            }
            state.x = newX;
            state.y = newY;
          },
          backward: (distance: number) => turtleBridge.forward(-distance),
          left: (angle: number) => {
            turtleStateRef.current.angle = (turtleStateRef.current.angle + angle) % 360;
          },
          right: (angle: number) => {
            turtleStateRef.current.angle = (turtleStateRef.current.angle - angle + 360) % 360;
          },
          penup: () => { turtleStateRef.current.penDown = false; },
          pendown: () => { turtleStateRef.current.penDown = true; },
          color: (c: string) => { turtleStateRef.current.color = c; },
          pensize: (s: number) => { turtleStateRef.current.size = s; },
          circle: (radius: number) => {
            const state = turtleStateRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx && state.penDown) {
              // Turtle circle is drawn with turtle on the circumference
              // Center is 'radius' to the left of the turtle
              const rad = ((state.angle + 90) * Math.PI) / 180;
              const centerX = state.x + radius * Math.cos(rad);
              const centerY = state.y - radius * Math.sin(rad);

              ctx.beginPath();
              ctx.arc(centerX, centerY, Math.abs(radius), 0, Math.PI * 2);
              ctx.strokeStyle = state.color;
              ctx.lineWidth = state.size;
              ctx.stroke();
            }
          },
          dot: (size?: number) => {
            const state = turtleStateRef.current;
            const ctx = canvas?.getContext('2d');
            if (ctx) {
              ctx.beginPath();
              ctx.arc(state.x, state.y, (size || state.size * 2) / 2, 0, Math.PI * 2);
              ctx.fillStyle = state.color;
              ctx.fill();
            }
          },
          reset: () => resetCanvas(),
          clear: () => resetCanvas()
        };

        // Expose bridge to Python
        // @ts-ignore
        pyodide.registerJsModule("turtle_bridge", turtleBridge);
        
        await pyodide.runPythonAsync(`
import turtle_bridge

class Turtle:
    def __init__(self):
        pass
    def forward(self, d): turtle_bridge.forward(d)
    def fd(self, d): turtle_bridge.forward(d)
    def backward(self, d): turtle_bridge.backward(d)
    def bk(self, d): turtle_bridge.backward(d)
    def left(self, a): turtle_bridge.left(a)
    def lt(self, a): turtle_bridge.left(a)
    def right(self, a): turtle_bridge.right(a)
    def rt(self, a): turtle_bridge.right(a)
    def penup(self): turtle_bridge.penup()
    def pu(self): turtle_bridge.penup()
    def pendown(self): turtle_bridge.pendown()
    def pd(self): turtle_bridge.pendown()
    def color(self, c): turtle_bridge.color(c)
    def pensize(self, s): turtle_bridge.pensize(s)
    def width(self, s): turtle_bridge.pensize(s)
    def circle(self, r): turtle_bridge.circle(r)
    def dot(self, s=None): turtle_bridge.dot(s)
    def reset(self): turtle_bridge.reset()
    def clear(self): turtle_bridge.clear()

def Turtle_func():
    return Turtle()

import sys
from types import ModuleType

turtle = ModuleType("turtle")
turtle.Turtle = Turtle_func
sys.modules["turtle"] = turtle
        `);
      }

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
        const solutionRegex = new RegExp(solution, 'is');
        const isMatch = solutionRegex.test(code);
        console.log('Challenge Check:', { matches: isMatch, solution });
        
        if (isMatch) {
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
    if (!initialCode.includes('import turtle')) {
      setShowCanvas(false);
    }
    resetCanvas();
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
        <AnimatePresence>
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0 bg-green-500/90 rounded-2xl flex flex-col items-center justify-center text-white z-10 backdrop-blur-sm"
            >
              <CheckCircle2 className="w-16 h-16 mb-2 animate-bounce" />
              <h3 className="text-2xl font-black uppercase tracking-tighter">Challenge Complete!</h3>
              <p className="font-bold opacity-80">You nailed it!</p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="absolute top-4 right-4 flex gap-2 z-20">
          <button
            onClick={() => setShowCanvas(!showCanvas)}
            className={`p-2 rounded-xl transition-all ${showCanvas ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
            title="Toggle Canvas"
          >
            <Palette className="w-5 h-5" />
          </button>
          <button
            onClick={resetCode}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-colors"
            title="Reset Code"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showCanvas && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="bg-white border-2 border-slate-200 rounded-2xl p-4 flex flex-col items-center gap-4">
              <div className="flex items-center justify-between w-full px-2">
                <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Turtle Canvas
                </h5>
                <button 
                  onClick={resetCanvas}
                  className="text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest"
                >
                  Clear Canvas
                </button>
              </div>
              <canvas 
                ref={canvasRef} 
                width={300} 
                height={300} 
                className="bg-slate-50 rounded-xl border border-slate-100 shadow-inner"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
