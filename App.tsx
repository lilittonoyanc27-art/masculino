/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Heart, 
  CheckCircle2, 
  XCircle, 
  ChevronRight, 
  Volume2, 
  Trophy,
  Lightbulb,
  MessageSquare
} from 'lucide-react';

/// --- Types ---

interface QuizItem {
  id: number;
  spanish: string;
  armenian: string;
}

// --- Data ---

const MASCULINE_NOUNS: QuizItem[] = [
  { id: 1, spanish: 'El libro', armenian: 'Գիրք' },
  { id: 2, spanish: 'El niño', armenian: 'Տղա (երեխա)' },
  { id: 3, spanish: 'El hombre', armenian: 'Տղամարդ' },
  { id: 4, spanish: 'El perro', armenian: 'Շուն' },
  { id: 5, spanish: 'El gato', armenian: 'Կատու' },
  { id: 6, spanish: 'El coche', armenian: 'Մեքենա' },
  { id: 7, spanish: 'El sol', armenian: 'Արև' },
  { id: 8, spanish: 'El árbol', armenian: 'Ծառ' },
  { id: 9, spanish: 'El pan', armenian: 'Հաց' },
  { id: 10, spanish: 'El mar', armenian: 'Ծով' },
  { id: 11, spanish: 'El río', armenian: 'Գետ' },
  { id: 12, spanish: 'El tiempo', armenian: 'Ժամանակ / Եղանակ' },
  { id: 13, spanish: 'El trabajo', armenian: 'Աշխատանք' },
  { id: 14, spanish: 'El dinero', armenian: 'Փող' },
  { id: 15, spanish: 'El mundo', armenian: 'Աշխարհ' },
  { id: 16, spanish: 'El viaje', armenian: 'Ճանապարհորդություն' },
  { id: 17, spanish: 'El plato', armenian: 'Ափսե' },
  { id: 18, spanish: 'El vaso', armenian: 'Բաժակ' },
  { id: 19, spanish: 'El papel', armenian: 'Թուղթ' },
  { id: 20, spanish: 'El reloj', armenian: 'Ժամացույց' },
  { id: 21, spanish: 'El día', armenian: 'Օր (բացառություն)' },
  { id: 22, spanish: 'El problema', armenian: 'Խնդիր (բացառություն)' },
  { id: 23, spanish: 'El idioma', armenian: 'Լեզու (բացառություն)' },
  { id: 24, spanish: 'El mapa', armenian: 'Քարտեզ (բացառություն)' },
  { id: 25, spanish: 'El avión', armenian: 'Ինքնաթիռ' },
  { id: 26, spanish: 'El tren', armenian: 'Գնացք' },
  { id: 27, spanish: 'El pie', armenian: 'Ոտք' },
  { id: 28, spanish: 'El ojo', armenian: 'Աչք' },
  { id: 29, spanish: 'El cuerpo', armenian: 'Մարմին' },
  { id: 30, spanish: 'El nombre', armenian: 'Անուն' },
  { id: 31, spanish: 'El cielo', armenian: 'Երկինք' },
  { id: 32, spanish: 'El fuego', armenian: 'Կրակ' },
  { id: 33, spanish: 'El viento', armenian: 'Քամի' },
  { id: 34, spanish: 'El jardín', armenian: 'Այգի' },
  { id: 35, spanish: 'El mercado', armenian: 'Շուկա' },
  { id: 36, spanish: 'El hotel', armenian: 'Հյուրանոց' },
  { id: 37, spanish: 'El café', armenian: 'Սուրճ' },
  { id: 38, spanish: 'El té', armenian: 'Թեյ' },
  { id: 39, spanish: 'El azúcar', armenian: 'Շաքարավազ' },
  { id: 40, spanish: 'El ordenador', armenian: 'Համակարգիչ' },
];

export default function App() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [lives, setLives] = useState(3);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [isFinished, setIsFinished] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  const currentItem = MASCULINE_NOUNS[currentIdx];

  useEffect(() => {
    if (currentItem) {
      const others = MASCULINE_NOUNS
        .filter(item => item.id !== currentItem.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 2)
        .map(item => item.armenian);
      
      const options = [...others, currentItem.armenian].sort(() => Math.random() - 0.5);
      setShuffledOptions(options);
      setSelectedOption(null);
      setFeedback(null);
    }
  }, [currentIdx]);

  const handleOptionSelect = (option: string) => {
    if (feedback) return;
    setSelectedOption(option);
  };

  const handleCheck = () => {
    if (!selectedOption || feedback) return;
    if (selectedOption === currentItem.armenian) {
      setFeedback('correct');
    } else {
      setFeedback('incorrect');
      setLives(prev => Math.max(0, prev - 1));
    }
  };

  const handleNext = () => {
    if (currentIdx < MASCULINE_NOUNS.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const progress = ((currentIdx + 1) / MASCULINE_NOUNS.length) * 100;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex items-center justify-center p-6 font-sans text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center max-w-md w-full shadow-2xl"
        >
          <Trophy className="w-24 h-24 mx-auto mb-6 text-yellow-400" />
          <h1 className="text-4xl font-bold mb-4">Գերազանց է!</h1>
          <p className="text-xl opacity-90 mb-8">Դուք սովորեցիք իսպաներենի արական սեռի հիմնական բառերը:</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-[#1e40af] rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all shadow-lg"
          >
            Սկսել նորից
          </button>
        </motion.div>
      </div>
    );
  }

  if (lives === 0) {
    return (
      <div className="min-h-screen bg-[#38bdf8] flex items-center justify-center p-6 font-sans text-white">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white/10 backdrop-blur-xl p-12 rounded-3xl border border-white/20 text-center max-w-md w-full"
        >
          <XCircle className="w-24 h-24 mx-auto mb-6 text-red-400" />
          <h1 className="text-4xl font-bold mb-4">Խաղն ավարտվեց</h1>
          <p className="text-xl opacity-90 mb-8">Փորձեք ևս մեկ անգամ սովորել բառերը:</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-4 bg-white text-[#1e40af] rounded-2xl font-bold text-lg hover:bg-opacity-90 transition-all"
          >
            Կրկնել
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#38bdf8] bg-gradient-to-b from-[#7dd3fc] to-[#38bdf8] flex flex-col font-sans text-white overflow-hidden">
      {/* Header */}
      <header className="p-6 flex items-center gap-4 max-w-2xl mx-auto w-full">
        <button className="p-2 hover:bg-black/10 rounded-full transition-colors">
          <X className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex-1 h-3 bg-white/30 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          />
        </div>

        <div className="relative">
          <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full border border-white/30">
            <Heart className="w-5 h-5 text-red-500 fill-red-500" />
            <span className="font-bold text-lg text-white">{lives}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center px-6 py-4 max-w-2xl mx-auto w-full overflow-y-auto custom-scrollbar">
        {/* Theory Box */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white rounded-3xl p-6 mb-8 shadow-xl text-gray-800 text-sm leading-relaxed border-b-4 border-gray-200 w-full"
        >
          <p className="font-bold mb-2 text-[#1e40af] flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Իսպաներենի արական սեռի գոյականներ (Género Masculino)
          </p>
          <div className="text-gray-600 space-y-2 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            <p>Իսպաներենում արական սեռի գոյականները սովորաբար վերջանում են <strong>-o</strong>-ով և օգտագործում են <strong>'el'</strong> որոշյալ հոդը:</p>
            <p>Կան նաև բացառություններ, ինչպիսիք են <strong>el día</strong> (օր), <strong>el problema</strong> (խնդիր), <strong>el idioma</strong> (լեզու) կամ <strong>el mapa</strong> (քարտեզ):</p>
          </div>
        </motion.div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white drop-shadow-sm mb-1">
            Ընտրեք ճիշտ թարգմանությունը
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentIdx}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full flex flex-col items-center"
          >
            {/* Word Card */}
            <div className="w-full bg-white rounded-3xl p-12 flex flex-col items-center justify-center shadow-2xl mb-8 relative border-b-4 border-gray-200">
              <div className="text-4xl font-black text-[#1e40af] text-center">
                {currentItem.spanish}
              </div>
            </div>

            {/* Options */}
            <div className="w-full space-y-4 max-w-[340px]">
              {shuffledOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full py-4 rounded-2xl font-bold text-lg transition-all border-b-4
                    ${selectedOption === option 
                      ? 'bg-[#1e40af] text-white border-[#1e3a8a] scale-[1.02]' 
                      : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="p-6 max-w-2xl mx-auto w-full">
        <button 
          onClick={feedback ? handleNext : handleCheck}
          disabled={!selectedOption}
          className={`w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-xl uppercase tracking-wider border-b-4
            ${!selectedOption 
              ? 'bg-white/20 text-white/50 border-transparent cursor-not-allowed' 
              : 'bg-[#1e40af] text-white border-[#1e3a8a] hover:bg-[#1e3a8a] active:scale-[0.98]'
            }`}
        >
          {feedback ? 'Շարունակել' : 'Ստուգել'}
        </button>
      </footer>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div 
            initial={{ y: 200 }}
            animate={{ y: 0 }}
            exit={{ y: 200 }}
            className={`fixed bottom-0 left-0 right-0 p-8 pb-10 z-50 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.3)]
              ${feedback === 'correct' ? 'bg-[#22c55e]' : 'bg-[#ef4444]'}`}
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="bg-white p-3 rounded-2xl shadow-inner">
                    {feedback === 'correct' ? (
                      <CheckCircle2 className="w-8 h-8 text-[#22c55e]" />
                    ) : (
                      <XCircle className="w-8 h-8 text-[#ef4444]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {feedback === 'correct' ? 'Ճիշտ է!' : 'Սխալ է'}
                    </h3>
                    <p className="text-white/90 font-medium">
                      {currentItem.spanish} — {currentItem.armenian}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 bg-white/20 rounded-full text-white hover:bg-white/30 transition-colors">
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <button 
                onClick={handleNext}
                className="w-full bg-[#1e40af] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#1e3a8a] transition-all shadow-lg border-b-4 border-[#1e3a8a]"
              >
                Շարունակել
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
