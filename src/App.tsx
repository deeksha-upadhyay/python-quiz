import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Star, Flame, Map as MapIcon, BookOpen, Code, Brain, ChevronLeft, Award, LogOut, User as UserIcon } from 'lucide-react';
import { learningData, Phase, Level } from './data/learningData';
import LevelMap from './components/LevelMap';
import LevelView from './components/LevelView';
import ChallengesView from './components/ChallengesView';
import LoginView from './components/LoginView';

export default function App() {
  const [user, setUser] = useState<string | null>(null);
  const [currentLevelId, setCurrentLevelId] = useState<number | null>(null);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState<string[]>([]);

  // Load progress from localStorage when user changes
  useEffect(() => {
    if (!user) return;
    
    const saved = localStorage.getItem(`python-game-progress-${user}`);
    if (saved) {
      const data = JSON.parse(saved);
      setCompletedLevels(data.completedLevels || []);
      setCompletedChallenges(data.completedChallenges || []);
      setPoints(data.points || 0);
      setStreak(data.streak || 0);
      setBadges(data.badges || []);
    } else {
      // Reset state for new user
      setCompletedLevels([]);
      setCompletedChallenges([]);
      setPoints(0);
      setStreak(0);
      setBadges([]);
    }
  }, [user]);

  // Save progress when state changes
  useEffect(() => {
    if (!user) return;
    
    localStorage.setItem(`python-game-progress-${user}`, JSON.stringify({
      completedLevels,
      completedChallenges,
      points,
      streak,
      badges
    }));
  }, [completedLevels, completedChallenges, points, streak, badges, user]);

  const handleLogout = () => {
    setUser(null);
    setCurrentLevelId(null);
  };

  const [view, setView] = useState<'map' | 'challenges'>('map');

  const handleLevelComplete = (levelId: number, earnedPoints: number) => {
    if (!completedLevels.includes(levelId)) {
      setCompletedLevels(prev => {
        const next = [...prev, levelId];
        
        // Check for badges based on new completion count
        if (next.length === 1 && !badges.includes('Beginner')) {
          setBadges(b => [...b, 'Beginner']);
        }
        if (next.length === 10 && !badges.includes('Explorer')) {
          setBadges(b => [...b, 'Explorer']);
        }
        
        return next;
      });
      setPoints(prev => prev + earnedPoints);
      setStreak(prev => prev + 1);
    }
    setCurrentLevelId(null);
  };

  const handleChallengeComplete = (challengeId: string, earnedPoints: number) => {
    console.log('Completing challenge:', challengeId, 'Points:', earnedPoints);
    setCompletedChallenges(prev => {
      if (prev.includes(challengeId)) {
        console.log('Challenge already completed:', challengeId);
        return prev;
      }
      
      const next = [...prev, challengeId];
      
      // Update points and streak
      setPoints(p => p + earnedPoints);
      setStreak(s => s + 1);
      
      // Update badges
      setBadges(current => {
        const nextBadges = [...current];
        if (next.length === 1 && !nextBadges.includes('Challenger')) nextBadges.push('Challenger');
        if (next.length === 5 && !nextBadges.includes('Master')) nextBadges.push('Master');
        return nextBadges;
      });
      
      return next;
    });
  };

  const phase1LevelIds = learningData.find(p => p.id === 1)?.levels.map(l => l.id) || [];
  const isPhase1Complete = completedLevels.filter(id => phase1LevelIds.includes(id)).length >= 5;

  const currentLevel = currentLevelId 
    ? learningData.flatMap(p => p.levels).find(l => l.id === currentLevelId)
    : null;

  if (!user) {
    return <LoginView onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-yellow-200">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentLevelId(null)}>
            <div className="bg-yellow-400 p-2 rounded-xl shadow-sm">
              <Code className="w-6 h-6 text-slate-900" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold tracking-tight leading-none">Python Quest</h1>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Player: {user}</span>
            </div>
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
            
            <button 
              onClick={handleLogout}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
              title="Switch User"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Stats Bar (Mobile Friendly) */}
      <div className="bg-white border-b border-slate-100 py-2 px-4 sm:hidden">
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded-full border border-yellow-100">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="font-bold text-yellow-700 text-sm">{points}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            <Flame className="w-3 h-3 text-orange-500 fill-orange-500" />
            <span className="font-bold text-orange-700 text-sm">{streak}</span>
          </div>
          <div className="flex items-center gap-1.5 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
            <Trophy className="w-3 h-3 text-purple-500" />
            <span className="font-bold text-purple-700 text-sm">{badges.length}</span>
          </div>
        </div>
      </div>

      {/* Stats Bar (Desktop) */}
      <div className="hidden sm:block max-w-5xl mx-auto px-6 pt-4">
        <div className="flex items-center justify-end gap-4">
          <div className="flex items-center gap-1.5 bg-yellow-50 px-4 py-2 rounded-2xl border border-yellow-100 shadow-sm">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="font-black text-yellow-700">{points} Points</span>
          </div>
          <div className="flex items-center gap-1.5 bg-orange-50 px-4 py-2 rounded-2xl border border-orange-100 shadow-sm">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
            <span className="font-black text-orange-700">{streak} Streak</span>
          </div>
          <div className="flex items-center gap-1.5 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-100 shadow-sm">
            <Trophy className="w-4 h-4 text-purple-500" />
            <span className="font-black text-purple-700">{badges.length} Badges</span>
          </div>
        </div>
      </div>

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
              >
                {!isPhase1Complete ? (
                  <div className="text-center py-20">
                    <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-200 max-w-2xl mx-auto">
                      <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Award className="w-10 h-10 text-purple-600" />
                      </div>
                      <h2 className="text-3xl font-black text-slate-800 mb-4">Challenge Mode</h2>
                      <p className="text-slate-500 text-lg mb-8">
                        Unlock Challenge Mode by completing the first 5 levels of Phase 1! 
                        Here you'll face real-world problems and earn legendary badges.
                      </p>
                      <button 
                        onClick={() => setView('map')}
                        className="bg-slate-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-slate-800 transition-all"
                      >
                        Keep Learning
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Challenge Arena</h2>
                      <p className="text-slate-500">Test your skills with real-world coding problems!</p>
                    </div>
                    <ChallengesView 
                      completedChallenges={completedChallenges}
                      onComplete={handleChallengeComplete}
                    />
                  </div>
                )}
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
