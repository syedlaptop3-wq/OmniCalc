import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Calculator, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

const tools = [
  { id: 'basic', name: 'Basic Calculator', cat: 'basic', path: '/basic', desc: 'Simple arithmetic operations.' },
  { id: 'scientific', name: 'Scientific Calculator', cat: 'basic', path: '/scientific', desc: 'Advanced math functions.' },
  { id: 'percentage', name: 'Percentage Calculator', cat: 'basic', path: '/percentage', desc: 'Calculate % changes and amounts.' },
  { id: 'loan', name: 'Loan / EMI Calculator', cat: 'finance', path: '/loan', desc: 'Plan your loans and mortgages.' },
  { id: 'compound', name: 'Compound Interest', cat: 'finance', path: '/compound-interest', desc: 'See your money grow over time.' },
  { id: 'age', name: 'Age Calculator', cat: 'health', path: '/age', desc: 'Calculate age in years, months, days.' },
  { id: 'bmi', name: 'BMI Calculator', cat: 'health', path: '/bmi', desc: 'Body Mass Index & health check.' },
  { id: 'quadratic', name: 'Quadratic Solver', cat: 'math', path: '/quadratic', desc: 'Solve polynomial equations.' },
  { id: 'stats', name: 'Statistics', cat: 'math', path: '/statistics', desc: 'Mean, median, and standard deviation.' },
  { id: 'base', name: 'Base Converter', cat: 'developer', path: '/base-converter', desc: 'Binary, Hex, Octal converter.' },
  { id: 'password', name: 'Password Gen', cat: 'developer', path: '/password-generator', desc: 'Create secure passwords.' },
  { id: 'unit', name: 'Unit Converter', cat: 'math', path: '/unit-converter', desc: 'Length, weight, and volume.' },
];

export const Home = () => {
  const [searchParams] = useSearchParams();
  const activeCategory = searchParams.get('category');
  const [search, setSearch] = useState('');

  const filteredTools = tools.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory ? t.cat === activeCategory : true;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      <SEO title="Home" description="OmniCalc - Free collection of online calculators for finance, math, and developers." />

      <div className="text-center py-10 space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl">
          The <span className="text-primary">Ultimate</span> Calculator Suite
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          100% Free, Offline-Ready, and Privacy-Focused tools for everyone.
        </p>

        <div className="max-w-md mx-auto relative mt-6">
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search calculators..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-lighter shadow-sm focus:ring-2 focus:ring-primary outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTools.map(tool => (
          <Link
            key={tool.id}
            to={tool.path}
            className="group relative bg-white dark:bg-dark-lighter p-6 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-lg bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <Calculator className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              {tool.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          No calculators found matching your criteria.
        </div>
      )}
    </div>
  );
};