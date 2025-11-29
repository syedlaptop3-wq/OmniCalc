import { useState } from 'react';
import { SEO } from '../components/SEO';
import { usePersistentState } from '../hooks/usePersistentState';
import { AdInlineCalculator } from '../components/AdPlaceholder';

// --- Loan / EMI Calculator ---
export const LoanCalculator = () => {
  const [amount, setAmount] = usePersistentState<number>('loan_amount', 10000);
  const [rate, setRate] = usePersistentState<number>('loan_rate', 5);
  const [years, setYears] = usePersistentState<number>('loan_years', 1);
  const [emi, setEmi] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);

  const calculate = () => {
    const r = rate / 12 / 100;
    const n = years * 12;
    const calculatedEmi = amount * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
    const totalPayable = calculatedEmi * n;

    setEmi(calculatedEmi);
    setTotalInterest(totalPayable - amount);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <SEO
        title="Loan EMI Calculator | Mortgage & Personal Loan Tool"
        description="Calculate your monthly loan EMI, total interest payable, and amortization schedule. Perfect for home, car, and personal loans."
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Loan EMI Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Plan your financial future with our precise Loan EMI Calculator. Quickly estimate your monthly Equated Monthly Installments (EMI), total interest payable, and the full repayment amount for home loans, car loans, or personal loans. Adjust tenure and interest rates to find a plan that fits your budget.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Loan Amount</label>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full p-2.5 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
              <input type="range" min="1000" max="1000000" step="1000" value={amount} onChange={e => setAmount(Number(e.target.value))} className="w-full mt-2 accent-primary cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Interest Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-2.5 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
              <input type="range" min="0.1" max="20" step="0.1" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full mt-2 accent-primary cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Tenure (Years)</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full p-2.5 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
              <input type="range" min="1" max="30" step="1" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full mt-2 accent-primary cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none" />
            </div>
            <button
              onClick={calculate}
              className="w-full py-3 bg-primary text-white font-semibold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-500/30"
            >
              Calculate EMI
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-dark p-6 rounded-xl flex flex-col justify-center text-center border border-gray-100 dark:border-gray-700">
            <div className="mb-4">
              <span className="text-gray-500 text-sm uppercase tracking-wider">Monthly EMI</span>
              <div className="text-3xl font-bold text-primary truncate">${emi.toFixed(2)}</div>
            </div>
            <div className="mb-4">
              <span className="text-gray-500 text-sm uppercase tracking-wider">Total Interest</span>
              <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 truncate">${totalInterest.toFixed(2)}</div>
            </div>
            <div>
              <span className="text-gray-500 text-sm uppercase tracking-wider">Total Payable</span>
              <div className="text-xl font-semibold text-gray-700 dark:text-gray-300 truncate">${(amount + totalInterest).toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Compound Interest ---
export const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = usePersistentState<number>('ci_principal', 1000);
  const [rate, setRate] = usePersistentState<number>('ci_rate', 5);
  const [years, setYears] = usePersistentState<number>('ci_years', 10);
  const [compounding, setCompounding] = usePersistentState<number>('ci_compounding', 12); // 12 for monthly
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const amount = principal * Math.pow((1 + (rate / 100) / compounding), compounding * years);
    setResult(amount);
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <SEO
        title="Compound Interest Calculator | Investment & Savings Tool"
        description="Calculate the future value of your investments with compound interest. Adjust principal, rate, and frequency to see how your money grows over time."
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Compound Interest Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Visualize the power of compounding with our Compound Interest Calculator. Ideal for investors and savers, this tool helps you project the future value of your investments by factoring in principal, interest rate, compounding frequency, and duration. See how your money grows over time.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase text-gray-500 font-bold mb-1 block">Principal</label>
              <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className="w-full p-2.5 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 font-bold mb-1 block">Rate (%)</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full p-2.5 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase text-gray-500 font-bold mb-1 block">Years</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full p-2.5 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
            </div>
            <div>
              <label className="text-xs uppercase text-gray-500 font-bold mb-1 block">Compounding</label>
              <select value={compounding} onChange={e => setCompounding(Number(e.target.value))} className="w-full p-2.5 border rounded-lg dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none">
                <option value={12}>Monthly</option>
                <option value={4}>Quarterly</option>
                <option value={1}>Annually</option>
              </select>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all active:scale-95 shadow-md shadow-blue-500/20"
          >
            Calculate
          </button>
          {result && (
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/10 text-center rounded-xl border border-green-200 dark:border-green-800/50">
              <div className="text-sm text-gray-500">Future Value</div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 my-1 truncate">${result.toFixed(2)}</div>
              <div className="text-xs text-gray-400 font-medium">Interest Earned: <span className="text-green-600 dark:text-green-400">+${(result - principal).toFixed(2)}</span></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
