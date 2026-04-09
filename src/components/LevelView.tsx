import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, Code, Brain, CheckCircle2, ArrowRight, Sparkles, Lightbulb } from 'lucide-react';
import { Level } from '../data/learningData';
import CodeEditor from './CodeEditor';
import Quiz from './Quiz';
import confetti from 'canvas-confetti';

interface LevelViewProps {
  level: Level;
  onComplete: (points: number) => void;
}

type Tab = 'learn' | 'practice' | 'quiz';

export default function LevelView({ level, onComplete }: LevelViewProps) {
  const [activeTab, setActiveTab] = useState<Tab>('learn');
  const [practiceDone, setPracticeDone] = useState(false);
  const [quizDone, setQuizDone] = useState(false);

  const handlePracticeComplete = () => {
    setPracticeDone(true);
    // Auto switch to quiz after a short delay
    setTimeout(() => setActiveTab('quiz'), 1500);
  };

  const handleQuizComplete = () => {
    setQuizDone(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FFA500', '#FF4500']
    });
  };

  const tabs = [
    { id: 'learn', label: 'Learn', icon: BookOpen, color: 'text-blue-500' },
    { id: 'practice', label: 'Practice', icon: Code, color: 'text-green-500' },
    { id: 'quiz', label: 'Quiz', icon: Brain, color: 'text-purple-500' },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-100 bg-slate-50/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as Tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold transition-all relative ${
              activeTab === tab.id ? tab.color : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-t-full ${tab.id === 'learn' ? 'bg-blue-500' : tab.id === 'practice' ? 'bg-green-500' : 'bg-purple-500'}`} 
              />
            )}
            {(tab.id === 'practice' && practiceDone) || (tab.id === 'quiz' && quizDone) ? (
              <CheckCircle2 className="w-4 h-4 text-green-500 ml-1" />
            ) : null}
          </button>
        ))}
      </div>

      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <h3 className="text-2xl font-black text-blue-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-6 h-6 text-yellow-500" />
                  {level.concept}
                </h3>
                <p className="text-blue-800 text-lg leading-relaxed">
                  {level.explanation}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" />
                  Check out this example:
                </h4>
                <pre className="bg-slate-900 text-slate-100 p-6 rounded-2xl font-mono text-lg overflow-x-auto shadow-inner">
                  {level.example}
                </pre>
              </div>

              <button
                onClick={() => setActiveTab('practice')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 group"
              >
                Let's Practice!
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}

          {activeTab === 'practice' && (
            <motion.div
              key="practice"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                <p className="text-green-800 font-bold text-lg">
                  🎯 {level.practicePrompt}
                </p>
              </div>
              
              <CodeEditor 
                initialCode={level.initialCode} 
                solution={level.solution}
                onSuccess={handlePracticeComplete}
              />
            </motion.div>
          )}

          {activeTab === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Quiz 
                questions={level.quiz} 
                onComplete={handleQuizComplete}
                onFinish={() => onComplete(level.rewardPoints)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
