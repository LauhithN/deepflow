import React, { ReactNode } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-cyber-blue-500 bg-cyber-black/90 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <motion.div 
            className="flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="text-2xl font-cyber-header tracking-wider text-white">
              <span className="text-cyber-blue-500">DEEP</span>
              <span className="text-cyber-purple-500">FLOW</span>
            </Link>
          </motion.div>
          
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ul className="flex gap-6 text-sm font-cyber uppercase">
              <li>
                <Link href="/" className="text-cyber-blue-300 hover:text-cyber-blue-500 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="#" className="text-cyber-blue-300 hover:text-cyber-blue-500 transition-colors">
                  Analysis
                </Link>
              </li>
              <li>
                <Link href="#" className="text-cyber-blue-300 hover:text-cyber-blue-500 transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </motion.nav>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {children}
      </main>
      
      <footer className="border-t border-cyber-blue-500 bg-cyber-black/90 py-6">
        <div className="container mx-auto px-4 text-center text-sm text-cyber-blue-300">
          <p>&copy; {new Date().getFullYear()} DeepFlow. Cybernetic productivity enhancement.</p>
          <p className="mt-1 text-xs opacity-50">Version 0.1.0 // Running on Neural Net Protocol</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout; 