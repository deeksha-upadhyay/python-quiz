import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Code, CheckCircle2, ChevronRight, Trophy, Star } from 'lucide-react';
import { challengesData, Challenge } from '../data/challengesData';
import CodeEditor from './CodeEditor';
import confetti from 'canvas-confetti';

interface ChallengesViewProps {
  onComplete: (id: string, points: number) => void;
  completedChallenges: string[];
}

export default function ChallengesView({ onComplete, completedChallenges }: ChallengesViewProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [showBadgeAlert, setShowBadgeAlert] = useState<string | null>(null);

  const handleChallengeSuccess = (challenge: Challenge) => {
    console.log('Challenge Success Triggered:', challenge.id);
    
    try {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#A855F7', '#D8B4FE', '#FAF5FF']
      });
    } catch (e) {
      console.error('Confetti error:', e);
    }
    
    // Show badge alert
    setShowBadgeAlert(challenge.title);
    
    // Call completion handler
    onComplete(challenge.id, challenge.rewardPoints);
    
    // Wait longer before closing to let the user see the success
    setTimeout(() => {
      setShowBadgeAlert(null);
      setSelectedChallenge(null);
    }, 4000);
  };

  return (
    <div className="space-y-8 relative">
      <AnimatePresence>
        {showBadgeAlert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-[100] bg-slate-900/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: -50 }}
              className="bg-white p-10 rounded-[40px] shadow-2xl border-8 border-purple-400 flex flex-col items-center gap-6 max-w-sm text-center"
            >
              <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center animate-bounce shadow-inner">
                <Trophy className="w-12 h-12 text-purple-600" />
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl font-black text-slate-800 tracking-tighter uppercase">Badge Earned!</h4>
                <p className="text-purple-600 font-bold text-lg">Challenge Master: {showBadgeAlert}</p>
              </div>
              <div className="bg-yellow-400 text-slate-900 px-6 py-2 rounded-2xl font-black text-lg shadow-lg rotate-3">
                + REWARD POINTS!
              </div>
              <p className="text-slate-400 text-sm font-bold">Progress Saved to Profile</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!selectedChallenge ? (
          <motion.div
            key="list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {challengesData.map((challenge) => {
              const isCompleted = completedChallenges.includes(challenge.id);
              return (
                <button
                  key={challenge.id}
                  onClick={() => setSelectedChallenge(challenge)}
                  className={`text-left p-6 rounded-3xl border-2 transition-all group relative overflow-hidden ${
                    isCompleted 
                      ? 'bg-green-50 border-green-200 hover:border-green-400' 
                      : 'bg-white border-slate-100 hover:border-purple-400 hover:shadow-xl'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${isCompleted ? 'bg-green-100' : 'bg-purple-100'}`}>
                      <Code className={`w-6 h-6 ${isCompleted ? 'text-green-600' : 'text-purple-600'}`} />
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1 rounded-full text-yellow-700 text-xs font-black">
                      <Star className="w-3 h-3 fill-current" />
                      {challenge.rewardPoints}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black text-slate-800 mb-2 group-hover:text-purple-600 transition-colors">
                    {challenge.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2">
                    {challenge.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${
                      challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                      challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {challenge.difficulty}
                    </span>
                    {isCompleted ? (
                      <div className="flex items-center gap-1 text-green-600 font-bold text-sm">
                        <CheckCircle2 className="w-4 h-4" />
                        Completed
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-purple-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                        Start Challenge
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </motion.div>
        ) : (
          <motion.div
            key="editor"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSelectedChallenge(null)}
                className="text-slate-500 hover:text-slate-800 font-bold flex items-center gap-2"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
                Back to Challenges
              </button>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-black text-slate-700">{selectedChallenge.rewardPoints} Points at stake</span>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 space-y-6">
              <div className="space-y-2">
                <h2 className="text-3xl font-black text-slate-800">{selectedChallenge.title}</h2>
                <p className="text-slate-600 text-lg">{selectedChallenge.description}</p>
              </div>

              <CodeEditor 
                initialCode={selectedChallenge.initialCode}
                solution={selectedChallenge.solution}
                onSuccess={() => handleChallengeSuccess(selectedChallenge)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
