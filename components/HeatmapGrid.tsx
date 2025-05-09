import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Define types
type Session = {
  date: Date;
  intensity: number; // 0-5 scale
  duration: number; // in minutes
};

type HeatmapGridProps = {
  sessions: Session[];
};

const ActivityLabel = [
  'Ghost Mode', // barely online
  'Data Drifter', // warming up
  'Synthwave Flow', // steady stream
  'Byte Storm', // rapid-fire execution
  'System Bleed', // pushing past the redline
  'Neural Overclocking' // maximum intensity
];

const HeatmapGrid: React.FC<HeatmapGridProps> = ({ sessions }) => {
  const [hoveredCell, setHoveredCell] = useState<Session | null>(null);
  
  // Get days of the week
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Get months for the last 12 weeks
  const getMonths = () => {
    const months = [];
    const today = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - (i * 7));
      months.unshift(date.toLocaleString('default', { month: 'short' }));
    }
    // Remove duplicates
    return [...new Set(months)];
  };
  
  const months = getMonths();
  
  // Group sessions by date for easy lookup
  const sessionsByDate: Record<string, Session> = sessions.reduce((acc, session) => {
    const dateKey = session.date.toISOString().split('T')[0];
    acc[dateKey] = session;
    return acc;
  }, {} as Record<string, Session>);
  
  // Generate grid cells for the last 12 weeks
  const generateCells = () => {
    const cells = [];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 83); // 12 weeks * 7 days - 1
    
    // Generate rows for each day of the week
    for (let day = 0; day < 7; day++) {
      const rowCells = [];
      
      // Generate columns for each date in the last 12 weeks
      for (let week = 0; week < 12; week++) {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + (week * 7) + day);
        const dateKey = date.toISOString().split('T')[0];
        const session = sessionsByDate[dateKey];
        const intensity = session ? session.intensity : 0;
        
        rowCells.push(
          <motion.div
            key={dateKey}
            className={`cyber-grid-cell activity-level-${intensity}`}
            whileHover={{ scale: 1.2 }}
            onMouseEnter={() => setHoveredCell(session || { date, intensity: 0, duration: 0 })}
            onMouseLeave={() => setHoveredCell(null)}
          />
        );
      }
      
      cells.push(
        <div key={`row-${day}`} className="flex items-center">
          <div className="w-8 text-xs opacity-50 mr-2">{daysOfWeek[day]}</div>
          <div className="flex gap-1">{rowCells}</div>
        </div>
      );
    }
    
    return cells;
  };
  
  return (
    <div className="cyber-card">
      <div className="flex justify-between mb-2">
        {months.map((month) => (
          <div key={month} className="text-xs opacity-70">{month}</div>
        ))}
      </div>
      
      <div className="cyber-grid">
        {generateCells()}
      </div>
      
      {hoveredCell && (
        <motion.div 
          className="mt-4 text-sm border-t border-cyber-blue-300/30 pt-4 text-cyber-blue-300"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex justify-between">
            <p>
              <span className="opacity-70">Date: </span>
              {hoveredCell.date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            </p>
            <p>
              <span className="opacity-70">Status: </span>
              <span className={`text-cyber-blue-${hoveredCell.intensity > 0 ? 500 : 300}`}>
                {ActivityLabel[hoveredCell.intensity]}
              </span>
            </p>
            <p>
              <span className="opacity-70">Duration: </span>
              {hoveredCell.duration} min
            </p>
          </div>
        </motion.div>
      )}
      
      <div className="mt-6 flex justify-between text-xs">
        <div className="flex items-center gap-4">
          {[0, 1, 2, 3, 4, 5].map((level) => (
            <div key={level} className="flex items-center gap-1">
              <div className={`cyber-grid-cell activity-level-${level} w-3 h-3`} />
              <span className="opacity-70">{level === 0 ? 'None' : `L${level}`}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeatmapGrid; 