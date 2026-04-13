import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, ArrowRight, Code, Sparkles } from 'lucide-react';

interface LoginViewProps {
  onLogin: (name: string) => void;
}

export default function LoginView({ onLogin }: LoginViewProps) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim().toLowerCase());
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl border-8 border-yellow-400 p-10 text-center space-y-8"
      >
        <div className="w-20 h-20 bg-yellow-100 rounded-3xl flex items-center justify-center mx-auto rotate-3 shadow-lg">
          <Code className="w-10 h-10 text-slate-900" />
        </div>

        <div className="space-y-2">
          <h2 className="text-4xl font-black text-slate-800 tracking-tighter uppercase">Python Quest</h2>
          <p className="text-slate-500 font-bold">Enter your name to continue your journey!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name or Email"
              className="w-full pl-12 pr-4 py-4 bg-slate-100 border-2 border-transparent focus:border-yellow-400 focus:bg-white rounded-2xl outline-none font-bold transition-all text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-xl active:scale-95 group"
          >
            Start Adventure
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="pt-4 flex items-center justify-center gap-2 text-slate-400 font-bold text-sm">
          <Sparkles className="w-4 h-4 text-yellow-500" />
          Progress saves automatically to your name!
        </div>
      </motion.div>
    </div>
  );
}
