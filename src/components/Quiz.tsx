import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, Trophy, ArrowRight, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../data/learningData';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
  onFinish: () => void;
}

export default function Quiz({ questions, onComplete, onFinish }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    
    if (idx === questions[currentIdx].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
      onComplete();
    }
  };

  const currentQuestion = questions[currentIdx];

  if (showResults) {
    return (
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-center py-12 space-y-6"
      >
        <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-100 rounded-full mb-4">
          <Trophy className="w-12 h-12 text-yellow-500" />
        </div>
        <h3 className="text-3xl font-black text-slate-800">Quiz Completed!</h3>
        <p className="text-xl text-slate-600">
          You got <span className="text-blue-600 font-black">{score}</span> out of <span className="font-black">{questions.length}</span> correct!
        </p>
        <button
          onClick={onFinish}
          className="bg-green-500 hover:bg-green-600 text-white font-black px-12 py-4 rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95"
        >
          Finish Level & Collect Rewards
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="text-sm font-black text-slate-400 uppercase tracking-widest">
          Question {currentIdx + 1} of {questions.length}
        </div>
        <div className="h-2 flex-1 mx-4 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="text-2xl font-bold text-slate-800 leading-tight">
        {currentQuestion.question}
      </h3>

      <div className="grid gap-4">
        {currentQuestion.options.map((option, idx) => {
          const isCorrect = idx === currentQuestion.correctAnswer;
          const isSelected = idx === selectedOption;
          
          let stateClasses = "bg-white border-slate-200 hover:border-purple-300 text-slate-700";
          if (isAnswered) {
            if (isCorrect) stateClasses = "bg-green-50 border-green-500 text-green-700 ring-2 ring-green-500/20";
            else if (isSelected) stateClasses = "bg-red-50 border-red-500 text-red-700 ring-2 ring-red-500/20";
            else stateClasses = "bg-white border-slate-100 text-slate-300 opacity-50";
          }

          return (
            <button
              key={idx}
              onClick={() => handleOptionClick(idx)}
              disabled={isAnswered}
              className={`w-full p-5 rounded-2xl border-2 text-left font-bold text-lg transition-all flex items-center justify-between group ${stateClasses}`}
            >
              {option}
              {isAnswered && isCorrect && <Check className="w-6 h-6 text-green-500" />}
              {isAnswered && isSelected && !isCorrect && <X className="w-6 h-6 text-red-500" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-purple-50 p-5 rounded-2xl border border-purple-100 flex gap-4">
              <HelpCircle className="w-6 h-6 text-purple-500 flex-shrink-0" />
              <p className="text-purple-800 font-medium">
                {currentQuestion.explanation}
              </p>
            </div>
            
            <button
              onClick={handleNext}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-2 group"
            >
              {currentIdx === questions.length - 1 ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
