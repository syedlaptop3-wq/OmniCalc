import React, { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { usePersistentState } from '../hooks/usePersistentState';
import { AdInlineCalculator } from '../components/AdPlaceholder';

// --- BMI Calculator ---
export const BMICalculator = () => {
  const [weight, setWeight] = usePersistentState<number>('bmi_weight', 70);
  const [height, setHeight] = usePersistentState<number>('bmi_height', 170);
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const hM = height / 100;
    setBmi(weight / (hM * hM));
  };

  const getStatus = (b: number) => {
    if (b < 18.5) return { text: 'Underweight', color: 'text-yellow-500' };
    if (b < 25) return { text: 'Normal', color: 'text-green-500' };
    if (b < 30) return { text: 'Overweight', color: 'text-orange-500' };
    return { text: 'Obese', color: 'text-red-500' };
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <SEO 
        title="BMI Calculator | Body Mass Index Check" 
        description="Calculate your Body Mass Index (BMI) instantly. Enter weight and height to see your health category: underweight, normal, overweight, or obese." 
        schemaType="HealthAndBeautyBusiness" 
      />
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">BMI Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Assess your health status instantly with our Body Mass Index (BMI) Calculator. By inputting your weight and height, you receive an immediate calculation and a categorized health status (underweight, normal, overweight, or obese) to help guide your fitness and wellness journey.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Weight (kg)</label>
            <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Height (cm)</label>
            <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="w-full p-3 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
          </div>
          <button 
            onClick={calculate} 
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Calculate BMI
          </button>
          {bmi !== null && (
            <div className="text-center mt-6 p-6 border rounded-xl bg-gray-50 dark:bg-dark border-gray-100 dark:border-gray-700">
              <div className="text-4xl font-extrabold mb-1">{bmi.toFixed(1)}</div>
              <div className={`text-lg font-bold uppercase tracking-wide ${getStatus(bmi).color}`}>{getStatus(bmi).text}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Age Calculator ---
export const AgeCalculator = () => {
  const [dob, setDob] = usePersistentState<string>('age_dob', '');
  const [age, setAge] = useState<{ years: number; months: number; days: number; minutes: string } | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    
    if (birthDate > today) {
      setAge(null);
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMs = today.getTime() - birthDate.getTime();
    const minutes = Math.floor(diffMs / (1000 * 60)).toLocaleString();

    setAge({ years, months, days, minutes });
  };

  useEffect(() => {
    if (dob) calculate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dob]);

  return (
    <div className="max-w-md mx-auto space-y-6">
      <SEO 
        title="Age Calculator | Calculate Exact Age" 
        description="Find your exact age in years, months, days, and total minutes. The best online age calculator for birthdays and milestones." 
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Age Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Discover your exact age down to the minute. The Age Calculator takes your date of birth and computes your precise age in years, months, and days. It also calculates the total time you have been alive in minutes, making it a fun tool for birthdays, anniversaries, and milestones.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-500 uppercase tracking-wider">Date of Birth</label>
            <input 
              type="date" 
              value={dob} 
              onChange={e => setDob(e.target.value)} 
              className="w-full p-4 border rounded-xl dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none text-lg" 
            />
          </div>

          <button 
            onClick={calculate} 
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
          >
            Calculate Age
          </button>

          {age && (
            <div className="mt-6 space-y-4 animate-fade-in">
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/50 text-center">
                <div className="text-5xl font-extrabold text-primary mb-1">{age.years}</div>
                <div className="text-gray-500 dark:text-gray-400 font-medium uppercase text-sm tracking-widest">Years Old</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-dark rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{age.months}</div>
                  <div className="text-xs text-gray-500 uppercase">Months</div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-dark rounded-xl border border-gray-100 dark:border-gray-700 text-center">
                  <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">{age.days}</div>
                  <div className="text-xs text-gray-500 uppercase">Days</div>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/10 rounded-xl border border-yellow-100 dark:border-yellow-800/30 text-center">
                <div className="text-sm text-yellow-700 dark:text-yellow-500 font-medium mb-1">Total Time Alive</div>
                <div className="text-xl font-mono font-bold text-gray-800 dark:text-gray-200 break-all">
                  {age.minutes} <span className="text-sm font-normal text-gray-500">minutes</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Quadratic Solver ---
export const QuadraticSolver = () => {
  const [a, setA] = usePersistentState<number>('quad_a', 1);
  const [b, setB] = usePersistentState<number>('quad_b', -3);
  const [c, setC] = usePersistentState<number>('quad_c', 2);
  const [roots, setRoots] = useState<string>('');

  const solve = () => {
    const d = b * b - 4 * a * c;
    if (d > 0) {
      const x1 = (-b + Math.sqrt(d)) / (2 * a);
      const x2 = (-b - Math.sqrt(d)) / (2 * a);
      setRoots(`x₁ = ${x1.toFixed(4)},  x₂ = ${x2.toFixed(4)}`);
    } else if (d === 0) {
      const x = -b / (2 * a);
      setRoots(`x = ${x.toFixed(4)}`);
    } else {
      const real = (-b / (2 * a)).toFixed(2);
      const imag = (Math.sqrt(-d) / (2 * a)).toFixed(2);
      setRoots(`x₁ = ${real} + ${imag}i,  x₂ = ${real} - ${imag}i`);
    }
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <SEO 
        title="Quadratic Equation Solver | Polynomial Roots Calculator" 
        description="Solve quadratic equations (Ax² + Bx + C = 0) instantly. Find real and complex roots for math homework and engineering problems." 
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Quadratic Equation Solver</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Solve complex polynomial equations in seconds. The Quadratic Equation Solver handles standard form equations (Ax² + Bx + C = 0) to find both real and complex roots. A substantial tool for algebra students, engineers, and mathematicians needing quick and accurate solutions.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-2 mb-6 justify-center text-lg font-serif">
          <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="w-16 p-2 text-center border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-secondary outline-none" />
          <span className="italic">x² +</span>
          <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="w-16 p-2 text-center border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-secondary outline-none" />
          <span className="italic">x +</span>
          <input type="number" value={c} onChange={e => setC(Number(e.target.value))} className="w-16 p-2 text-center border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-secondary outline-none" />
          <span>= 0</span>
        </div>
        <button 
          onClick={solve} 
          className="w-full py-3 bg-secondary text-white font-bold rounded-xl hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-indigo-500/20"
        >
          Solve Equation
        </button>
        {roots && <div className="mt-6 text-center font-mono text-lg bg-gray-50 dark:bg-dark p-4 rounded-xl border border-gray-200 dark:border-gray-700 break-words">{roots}</div>}
      </div>
    </div>
  );
};

// --- Statistics Calculator ---
export const StatisticsCalculator = () => {
  const [input, setInput] = usePersistentState<string>('stats_input', '1, 2, 3, 4, 5');
  const [stats, setStats] = useState<any>(null);

  const calculate = () => {
    const nums = input.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
    if (nums.length === 0) return;
    
    nums.sort((a, b) => a - b);
    const sum = nums.reduce((acc, v) => acc + v, 0);
    const mean = sum / nums.length;
    const mid = Math.floor(nums.length / 2);
    const median = nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
    const variance = nums.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);

    setStats({ mean, median, stdDev, min: nums[0], max: nums[nums.length - 1], count: nums.length });
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <SEO 
        title="Statistics Calculator | Mean, Median, Mode, SD" 
        description="Calculate statistical data including mean, median, mode, standard deviation, and range. Perfect for students and data analysts." 
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Statistics Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Analyze your data sets effortlessly. Input a series of numbers to instantly calculate key statistical metrics including Mean (average), Median, Standard Deviation, and range. Perfect for students, researchers, and data analysts looking for quick descriptive statistics.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="mb-4">
          <label className="block text-sm text-gray-500 mb-2">Enter numbers separated by commas</label>
          <textarea 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            className="w-full p-3 border rounded-xl dark:bg-dark dark:border-gray-700 h-24 font-mono text-sm focus:ring-2 focus:ring-primary outline-none"
            placeholder="10, 20, 30..."
          />
        </div>
        <button 
          onClick={calculate} 
          className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/20"
        >
          Calculate Statistics
        </button>
        
        {stats && (
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
            {Object.entries(stats).map(([key, val]: [string, any]) => (
               <div key={key} className="p-3 bg-gray-50 dark:bg-dark rounded-lg border border-gray-100 dark:border-gray-700 flex flex-col items-center">
                 <span className="text-gray-500 text-xs uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                 <b className="text-lg text-gray-800 dark:text-gray-200">{typeof val === 'number' && val % 1 !== 0 ? val.toFixed(2) : val}</b>
               </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
