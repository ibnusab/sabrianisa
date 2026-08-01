import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart, Edit3, Check, RotateCcw, X } from 'lucide-react';
import { useCouple } from '../context/CoupleContext';

export const Letter: React.FC = () => {
  const { settings } = useCouple();
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [letterText, setLetterText] = useState(
    `My Dearest ${settings.partner2_name},\n\n` +
    `From the very second our paths crossed, my world turned into a softer, warmer, and endlessly brighter place.\n\n` +
    `Thank you for laughing at my silly jokes, holding my hand through quiet storms, and making every ordinary Tuesday feel like a cozy fairytale. Every memory we write together is my favorite page in the universe.\n\n` +
    `I promise to keep loving you more with every sunrise.\n\n` +
    `Forever Yours,\n` +
    `${settings.partner1_name} 💕`
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8 min-h-[80vh] flex flex-col justify-center">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-semibold">
          <Mail className="w-3.5 h-3.5" />
          <span>Interactive Envelope Experience</span>
        </div>
        <h1 className="font-serif font-extrabold text-3xl sm:text-5xl text-slate-800">
          A Love Letter For You
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Tap the envelope seal below to open and unfold your handwritten letter.
        </p>
      </div>

      {/* Envelope & Unfolding Letter Stage */}
      <div className="relative flex flex-col items-center justify-center my-8 min-h-[420px]">
        
        {/* Envelope Closed / Hover */}
        {!isOpen ? (
          <motion.div
            whileHover={{ scale: 1.03, rotate: 1 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsOpen(true)}
            className="cursor-pointer relative w-72 sm:w-96 h-56 sm:h-64 rounded-3xl bg-gradient-to-tr from-rose-200 via-pink-100 to-rose-300 p-6 shadow-2xl border-2 border-white flex flex-col items-center justify-between overflow-hidden group"
          >
            {/* Wax Seal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-xl border-2 border-rose-300 group-hover:scale-110 transition-transform">
              <Heart className="w-8 h-8 fill-current text-white animate-pulse" />
            </div>

            {/* To & From Label */}
            <div className="w-full text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">
                To My Darling
              </span>
              <p className="font-serif font-bold text-lg text-slate-800">{settings.partner2_name}</p>
            </div>

            <div className="w-full text-right">
              <p className="text-xs text-rose-500 font-semibold italic">Tap wax seal to open 💌</p>
            </div>
          </motion.div>
        ) : (
          /* Unfolded Letter Sheet */
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="glass-card bg-rose-50/90 max-w-2xl w-full p-8 sm:p-12 rounded-3xl shadow-2xl border-2 border-rose-200 relative text-slate-800 font-serif leading-relaxed space-y-6"
          >
            {/* Top Ribbon & Buttons */}
            <div className="flex items-center justify-between border-b border-rose-200 pb-4">
              <div className="flex items-center space-x-2 text-rose-600">
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-xs uppercase tracking-widest">Sealed with a Kiss</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 rounded-xl bg-white/80 hover:bg-white text-rose-600 border border-rose-200 text-xs font-semibold flex items-center space-x-1 shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Letter</span>
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl bg-white/80 hover:bg-rose-50 text-slate-500 border border-rose-200"
                  title="Close Envelope"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Formatted Letter Body */}
            <div className="text-sm sm:text-base text-slate-700 whitespace-pre-line font-serif italic py-2">
              {letterText}
            </div>

            <div className="pt-4 border-t border-rose-200 flex items-center justify-center">
              <span className="text-xs text-rose-400 font-sans tracking-widest uppercase">
                sabrianisa • Eternal Promise
              </span>
            </div>
          </motion.div>
        )}

      </div>

      {/* Edit Letter Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 pt-16 sm:pt-20 overflow-y-auto">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card bg-white max-w-lg w-full rounded-3xl shadow-2xl border border-rose-200 flex flex-col max-h-[90vh] my-auto overflow-hidden"
          >
            <div className="p-4 sm:p-5 border-b border-rose-100 flex items-center justify-between shrink-0 bg-white">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-slate-800 flex items-center space-x-2">
                <Edit3 className="w-5 h-5 text-rose-500" />
                <span>Compose Love Letter</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-full hover:bg-rose-50 text-slate-400 hover:text-rose-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4">
              <textarea
                rows={8}
                value={letterText}
                onChange={(e) => setLetterText(e.target.value)}
                className="w-full p-4 rounded-xl border border-rose-200 focus:border-rose-400 text-xs sm:text-sm font-serif outline-none leading-relaxed bg-white"
              />
            </div>

            <div className="p-4 sm:p-5 border-t border-rose-100 flex items-center justify-end space-x-3 shrink-0 bg-white/95 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 text-white font-bold text-xs shadow-md hover:scale-105 transition-all flex items-center space-x-1"
              >
                <Check className="w-4 h-4" />
                <span>Save Letter</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
