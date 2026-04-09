import React from 'react';
import { motion } from 'motion/react';
import { Check, Lock, Play, Star } from 'lucide-react';
import { Phase, Level } from '../data/learningData';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LevelMapProps {
  phases: Phase[];
  completedLevels: number[];
  onSelectLevel: (id: number) => void;
}

export default function LevelMap({ phases, completedLevels, onSelectLevel }: LevelMapProps) {
  return (
    <div className="space-y-12 pb-20">
      {phases.map((phase, phaseIdx) => {
        const isPhaseUnlocked = phaseIdx === 0 || phase.levels.some(l => completedLevels.includes(l.id)) || 
          phases[phaseIdx - 1].levels.every(l => completedLevels.includes(l.id));

        return (
          <div key={phase.id} className={cn("relative", !isPhaseUnlocked && "opacity-60 grayscale")}>
            <div className="flex items-center gap-4 mb-8">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg", phase.color)}>
                <Star className="w-6 h-6 text-white fill-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800">Phase {phase.id}: {phase.title}</h3>
                <p className="text-sm text-slate-500">{phase.levels.length} Levels</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 relative">
              {/* Path line could be added here with SVG */}
              {phase.levels.map((level, levelIdx) => {
                const isCompleted = completedLevels.includes(level.id);
                const isUnlocked = isCompleted || 
                  (levelIdx === 0 && isPhaseUnlocked) || 
                  (levelIdx > 0 && completedLevels.includes(phase.levels[levelIdx - 1].id));

                return (
                  <motion.button
                    key={level.id}
                    whileHover={isUnlocked ? { scale: 1.05, y: -5 } : {}}
                    whileTap={isUnlocked ? { scale: 0.95 } : {}}
                    onClick={() => isUnlocked && onSelectLevel(level.id)}
                    disabled={!isUnlocked}
                    className={cn(
                      "relative aspect-square rounded-3xl flex flex-col items-center justify-center gap-2 transition-all shadow-md border-b-4",
                      isCompleted ? "bg-green-500 border-green-700 text-white" : 
                      isUnlocked ? "bg-white border-slate-200 text-slate-800 hover:border-yellow-400" : 
                      "bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed"
                    )}
                  >
                    <div className="text-xs font-black uppercase tracking-widest opacity-60">Level {level.id}</div>
                    <div className="p-3 rounded-full bg-black/5">
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : isUnlocked ? (
                        <Play className="w-6 h-6 fill-current ml-1" />
                      ) : (
                        <Lock className="w-6 h-6" />
                      )}
                    </div>
                    <div className="text-[10px] font-bold px-2 text-center line-clamp-1">{level.title}</div>
                    
                    {isUnlocked && !isCompleted && (
                      <div className="absolute -top-2 -right-2 bg-yellow-400 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
                        NEW
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
