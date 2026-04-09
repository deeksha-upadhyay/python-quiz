import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Flame, Map as MapIcon, BookOpen, Code, Brain, ChevronLeft, Award } from 'lucide-react';
import { learningData, Phase, Level } from './data/learningData';
import LevelMap from './components/LevelMap';
import LevelView from './components/LevelView';

export default function App() {
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('python-game-progress');
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedLevels(data.completedLevels || []);
      setPoints(data.points || 0);
      setStreak(data.streak || 0);
      setBadges(data.badges || []);
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('python-game-progress', JSON.stringify({
      completedLevels,
      points,
      streak,
      badges
    }));
  }, [completedLevels, points, streak, badges]);

  const [view, setView] = useState<'map' | 'challenges'>('map');

  const handleLevelComplete = (levelId: number, earnedPoints: number) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels([...completedLevels, levelId]);
      setPoints(points + earnedPoints);
      setStreak(streak + 1);
      
      // Check for badges
      if (completedLevels.length + 1 === 1 && !badges.includes('Beginner')) {
        setBadges([...badges, 'Beginner']);
      }
      if (completedLevels.length + 1 === 10 && !badges.includes('Explorer')) {
        setBadges([...badges, 'Explorer']);
      }
    }
    setCurrentLevelId(null);
  };

  const currentLevel = currentLevelId 
    ? learningData.flatMap(p => p.levels).find(l => l.id === currentLevelId)
    : null;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-yellow-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentLevelId(null)}>
            <div className="bg-yellow-400 p-2 rounded-xl shadow-sm">
              <Code className="w-6 h-6 text-slate-900" />
            </div>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Python Quest</h1>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button 
              onClick={() => setView('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${view === 'map' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <MapIcon className="w-4 h-4" />
              Map
            </button>
            <button 
              onClick={() => setView('challenges')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors ${view === 'challenges' ? 'bg-slate-100 text-slate-900 font-bold' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <Award className="w-4 h-4" />
              Challenges
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1 hidden sm:block" />
            <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <span className="font-bold text-yellow-700">{points}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-full border border-orange-100">
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span className="font-bold text-orange-700">{streak}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
              <Trophy className="w-4 h-4 text-purple-500" />
              <span className="font-bold text-purple-700">{badges.length}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 sm:p-6">
        <AnimatePresence mode="wait">
          {currentLevelId === null ? (
            view === 'map' ? (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="mb-8 text-center">
                  <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Your Coding Journey</h2>
                  <p className="text-slate-500">Complete levels to unlock new powers!</p>
                </div>
                <LevelMap 
                  phases={learningData} 
                  completedLevels={completedLevels} 
                  onSelectLevel={setCurrentLevelId} 
                />
              </motion.div>
            ) : (
              <motion.div
                key="challenges"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="text-center py-20"
              >
                <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-200 max-w-2xl mx-auto">
                  <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Award className="w-10 h-10 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-800 mb-4">Challenge Mode</h2>
                  <p className="text-slate-500 text-lg mb-8">
                    Unlock Challenge Mode by completing Phase 1! 
                    Here you'll face real-world problems and earn legendary badges.
                  </p>
                  <button 
                    onClick={() => setView('map')}
                    className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-all"
                  >
                    Keep Learning
                  </button>
                </div>
              </motion.div>
            )
          ) : (
            <motion.div
              key="level"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <button 
                onClick={() => setCurrentLevelId(null)}
                className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-medium"
              >
                <ChevronLeft className="w-5 h-5" />
                Back to Map
              </button>
              {currentLevel && (
                <LevelView 
                  level={currentLevel} 
                  onComplete={(pts) => handleLevelComplete(currentLevel.id, pts)} 
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Badges Sidebar / Modal could go here */}
    </div>
  );
}
