import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, ChevronRight, Home, Calculator } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { AdPlaceholder } from './AdPlaceholder';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (document.documentElement.classList.contains('dark')) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className={`min-h-screen flex bg-gray-50 dark:bg-dark text-gray-900 dark:text-gray-100 transition-colors duration-200`}>
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-lighter border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between flex-shrink-0">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary" onClick={() => setSidebarOpen(false)}>
              <Calculator className="w-6 h-6" />
              <span>OmniCalc</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            <Link 
              to="/" 
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/' 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>

            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Categories</p>
            </div>

            {CATEGORIES.map(cat => (
              <div key={cat.id} className="space-y-1">
                <Link
                  to={`/?category=${cat.id}`}
                  onClick={() => setSidebarOpen(false)}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 group transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <cat.icon className="w-5 h-5 group-hover:text-primary transition-colors" />
                    <span>{cat.name}</span>
                  </div>
                </Link>
              </div>
            ))}
            
            <div className="pt-4 pb-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Resources</p>
            </div>
            <Link to="/blog" onClick={() => setSidebarOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
              <span>Blog</span>
            </Link>
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <AdPlaceholder id="ad-sidebar" className="h-48 text-xs my-0" />
            <div className="mt-4 text-xs text-center text-gray-500">
              &copy; 2024 OmniCalc. Offline capable.
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 h-16 flex items-center justify-between px-4 lg:px-8">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            {location.pathname !== '/' && (
              <>
                <Link to="/" className="hover:text-primary">Home</Link>
                <ChevronRight className="w-4 h-4" />
                <span className="text-gray-900 dark:text-gray-100 font-medium">
                  {location.pathname.split('/').pop()?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </span>
              </>
            )}
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-300"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </header>

        {/* Updated Main padding for better mobile fit */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-x-hidden flex flex-col">
          <div className="max-w-6xl mx-auto w-full flex-1">
            <AdPlaceholder id="ad-top" className="h-20 mb-8" />
            {children}
            <AdPlaceholder id="ad-bottom" className="h-20 mt-8" />
          </div>

          <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <Link to="/about" className="hover:text-primary">About Us</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
              <Link to="/privacy" className="hover:text-primary">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-primary">Terms of Service</Link>
            </div>
            <p>Built with ❤️ for productivity.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};