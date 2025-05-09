import { useState } from 'react';
import Layout from '../components/Layout';
import HeatmapGrid from '../components/HeatmapGrid';
import FocusTimer from '../components/FocusTimer';
import StatsPanel from '../components/StatsPanel';

export default function Home() {
  // Mock data for the initial display
  const [mockData, setMockData] = useState({
    // Sample data for the last 3 months (12 weeks x 7 days)
    sessions: Array.from({ length: 84 }, (_, i) => ({
      date: new Date(Date.now() - (83 - i) * 24 * 60 * 60 * 1000),
      intensity: Math.floor(Math.random() * 6), // 0-5 intensity level
      duration: Math.floor(Math.random() * 120) + 15, // 15-135 min
    })),
  });

  return (
    <Layout>
      <div className="flex flex-col gap-8 pb-12">
        <section className="cyber-container">
          <h2 className="text-2xl mb-4 text-cyber-blue-500">Neural Sync Activity</h2>
          <HeatmapGrid sessions={mockData.sessions} />
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section className="cyber-container">
            <h2 className="text-2xl mb-4 text-cyber-purple-500">Focus Timer</h2>
            <FocusTimer />
          </section>

          <section className="cyber-container">
            <h2 className="text-2xl mb-4 text-cyber-green-500">System Diagnostics</h2>
            <StatsPanel sessions={mockData.sessions} />
          </section>
        </div>
      </div>
    </Layout>
  );
} 