import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type TimerMode = {
  name: string;
  description: string;
  duration: number;
  color: string;
};

const timerModes: TimerMode[] = [
  {
    name: 'Ghost Mode',
    description: 'Light focus, frequent breaks',
    duration: 15 * 60, // 15 minutes in seconds
    color: 'cyber-blue',
  },
  {
    name: 'Data Drifter',
    description: 'Standard focus session',
    duration: 25 * 60, // 25 minutes in seconds
    color: 'cyber-blue',
  },
  {
    name: 'Synthwave Flow',
    description: 'Extended deep focus',
    duration: 45 * 60, // 45 minutes in seconds
    color: 'cyber-purple',
  },
  {
    name: 'Byte Storm',
    description: 'Intense productivity sprint',
    duration: 60 * 60, // 60 minutes in seconds
    color: 'cyber-purple',
  },
  {
    name: 'System Bleed',
    description: 'Extended deep work session',
    duration: 90 * 60, // 90 minutes in seconds
    color: 'cyber-green',
  },
];

const FocusTimer: React.FC = () => {
  const [selectedMode, setSelectedMode] = useState<TimerMode>(timerModes[1]); // Default to Data Drifter
  const [timeRemaining, setTimeRemaining] = useState<number>(timerModes[1].duration);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    // Reset timer when mode changes
    setTimeRemaining(selectedMode.duration);
    setIsActive(false);
    setIsPaused(false);
    
    // Clear any existing timer
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, [selectedMode]);
  
  useEffect(() => {
    // Timer logic
    if (isActive && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Timer finished
            clearInterval(timerRef.current as NodeJS.Timeout);
            setIsActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, isPaused]);
  
  const startTimer = () => {
    setIsActive(true);
    setIsPaused(false);
  };
  
  const pauseTimer = () => {
    setIsPaused(true);
  };
  
  const resumeTimer = () => {
    setIsPaused(false);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setIsPaused(false);
    setTimeRemaining(selectedMode.duration);
  };
  
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage
  const progress = ((selectedMode.duration - timeRemaining) / selectedMode.duration) * 100;
  
  return (
    <div className="flex flex-col items-center">
      <div className="mb-6 w-full">
        <div className="grid grid-cols-5 gap-2">
          {timerModes.map((mode, index) => (
            <button
              key={mode.name}
              className={`text-xs p-2 border transition-all ${
                selectedMode.name === mode.name 
                  ? `border-${mode.color}-500 bg-${mode.color}-500/20 text-${mode.color}-500` 
                  : 'border-gray-700 hover:border-gray-500 text-gray-400'
              }`}
              onClick={() => setSelectedMode(mode)}
            >
              {mode.name}
            </button>
          ))}
        </div>
        <p className="mt-2 text-sm opacity-70 text-center">{selectedMode.description}</p>
      </div>
      
      <div className="relative w-48 h-48 flex items-center justify-center mb-6">
        {/* Progress ring */}
        <svg className="w-full h-full -rotate-90 absolute" viewBox="0 0 100 100">
          <circle
            className="text-gray-700 stroke-current"
            strokeWidth="4"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
          />
          <circle
            className={`text-${selectedMode.color}-500 stroke-current`}
            strokeWidth="4"
            strokeLinecap="round"
            cx="50"
            cy="50"
            r="46"
            fill="transparent"
            strokeDasharray="289.2"
            strokeDashoffset={289.2 - (289.2 * progress) / 100}
          />
        </svg>
        
        {/* Timer display */}
        <div className="text-center z-10">
          <p className={`text-4xl font-cyber-header text-${selectedMode.color}-500`}>
            {formatTime(timeRemaining)}
          </p>
          <p className="text-xs mt-2 opacity-70">
            {isActive ? (isPaused ? 'PAUSED' : 'RUNNING') : 'READY'}
          </p>
        </div>
      </div>
      
      <div className="flex gap-4">
        {!isActive ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`cyber-button bg-${selectedMode.color}-500/10 border-${selectedMode.color}-500 text-${selectedMode.color}-500`}
            onClick={startTimer}
          >
            START
          </motion.button>
        ) : isPaused ? (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cyber-button bg-${selectedMode.color}-500/10 border-${selectedMode.color}-500 text-${selectedMode.color}-500`}
              onClick={resumeTimer}
            >
              RESUME
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button bg-cyber-black border-gray-500 text-gray-500"
              onClick={resetTimer}
            >
              RESET
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`cyber-button bg-${selectedMode.color}-500/10 border-${selectedMode.color}-500 text-${selectedMode.color}-500`}
              onClick={pauseTimer}
            >
              PAUSE
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cyber-button bg-cyber-black border-gray-500 text-gray-500"
              onClick={resetTimer}
            >
              RESET
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
};

export default FocusTimer; 