import React from 'react';
import { motion } from 'framer-motion';

// Define types
type Session = {
  date: Date;
  intensity: number; // 0-5 scale
  duration: number; // in minutes
};

type StatsPanelProps = {
  sessions: Session[];
};

const StatsPanel: React.FC<StatsPanelProps> = ({ sessions }) => {
  // Calculate stats based on sessions
  const calculateStats = () => {
    if (sessions.length === 0) {
      return {
        totalSessions: 0,
        totalDuration: 0,
        avgDuration: 0,
        avgIntensity: 0,
        currentStreak: 0,
        longestStreak: 0,
        mostProductive: 'N/A',
      };
    }

    const totalSessions = sessions.length;
    const totalDuration = sessions.reduce((sum, session) => sum + session.duration, 0);
    const avgDuration = Math.round(totalDuration / totalSessions);
    const avgIntensity = parseFloat((sessions.reduce((sum, session) => sum + session.intensity, 0) / totalSessions).toFixed(1));
    
    // Calculate streaks
    let currentStreak = 0;
    let longestStreak = 0;
    let counting = false;
    
    // Group sessions by day
    const sessionsByDay = sessions.reduce((acc: Record<string, Session[]>, session) => {
      const dateKey = session.date.toISOString().split('T')[0];
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(session);
      return acc;
    }, {});
    
    // Sort days
    const sortedDays = Object.keys(sessionsByDay).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
    
    // Calculate current streak
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (sessionsByDay[today]) {
      currentStreak = 1;
      let checkDate = yesterday;
      let daysBack = 1;
      
      while (sessionsByDay[checkDate]) {
        currentStreak++;
        daysBack++;
        checkDate = new Date(Date.now() - daysBack * 86400000).toISOString().split('T')[0];
      }
    } else if (sessionsByDay[yesterday]) {
      currentStreak = 1;
      let checkDate = new Date(Date.now() - 2 * 86400000).toISOString().split('T')[0];
      let daysBack = 2;
      
      while (sessionsByDay[checkDate]) {
        currentStreak++;
        daysBack++;
        checkDate = new Date(Date.now() - daysBack * 86400000).toISOString().split('T')[0];
      }
    }
    
    // Calculate longest streak
    let tempStreak = 0;
    for (let i = 0; i < sortedDays.length; i++) {
      const currentDate = new Date(sortedDays[i]);
      
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedDays[i-1]);
        const diffDays = Math.round((prevDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          if (tempStreak > longestStreak) {
            longestStreak = tempStreak;
          }
          tempStreak = 1;
        }
      }
    }
    
    if (tempStreak > longestStreak) {
      longestStreak = tempStreak;
    }
    
    // Determine most productive day of week
    const sessionsByDayOfWeek: Record<string, number> = {
      'Sunday': 0,
      'Monday': 0,
      'Tuesday': 0,
      'Wednesday': 0,
      'Thursday': 0,
      'Friday': 0,
      'Saturday': 0
    };
    
    sessions.forEach(session => {
      const day = session.date.toLocaleDateString('en-US', { weekday: 'long' });
      sessionsByDayOfWeek[day] += session.duration * (session.intensity || 1);
    });
    
    const mostProductive = Object.entries(sessionsByDayOfWeek)
      .sort((a, b) => b[1] - a[1])[0][0];
      
    return {
      totalSessions,
      totalDuration,
      avgDuration,
      avgIntensity,
      currentStreak,
      longestStreak,
      mostProductive
    };
  };
  
  const stats = calculateStats();
  
  return (
    <div className="grid grid-cols-2 gap-4">
      <motion.div 
        className="cyber-card p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs opacity-70 mb-1">Total Sessions</p>
        <p className="text-2xl font-cyber-header text-cyber-green-500">{stats.totalSessions}</p>
      </motion.div>
      
      <motion.div 
        className="cyber-card p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <p className="text-xs opacity-70 mb-1">Total Focus Time</p>
        <p className="text-2xl font-cyber-header text-cyber-green-500">
          {Math.floor(stats.totalDuration / 60)}h {stats.totalDuration % 60}m
        </p>
      </motion.div>
      
      <motion.div 
        className="cyber-card p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="text-xs opacity-70 mb-1">Avg. Session</p>
        <p className="text-2xl font-cyber-header text-cyber-purple-500">
          {stats.avgDuration} min
        </p>
      </motion.div>
      
      <motion.div 
        className="cyber-card p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <p className="text-xs opacity-70 mb-1">Avg. Intensity</p>
        <p className="text-2xl font-cyber-header text-cyber-purple-500">
          {stats.avgIntensity}/5
        </p>
      </motion.div>
      
      <motion.div 
        className="cyber-card p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <p className="text-xs opacity-70 mb-1">Current Streak</p>
        <p className="text-2xl font-cyber-header text-cyber-blue-500">
          {stats.currentStreak} days
        </p>
      </motion.div>
      
      <motion.div 
        className="cyber-card p-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <p className="text-xs opacity-70 mb-1">Longest Streak</p>
        <p className="text-2xl font-cyber-header text-cyber-blue-500">
          {stats.longestStreak} days
        </p>
      </motion.div>
      
      <motion.div 
        className="cyber-card p-3 col-span-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <p className="text-xs opacity-70 mb-1">Most Productive Day</p>
        <p className="text-2xl font-cyber-header text-cyber-green-500">
          {stats.mostProductive}
        </p>
      </motion.div>
    </div>
  );
};

export default StatsPanel; 