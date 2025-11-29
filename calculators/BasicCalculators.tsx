import { useState, useEffect, useCallback } from 'react';
import { SEO } from '../components/SEO';
import { usePersistentState } from '../hooks/usePersistentState';
import { Delete, Copy, Check } from 'lucide-react';
import { AdInlineCalculator } from '../components/AdPlaceholder';

// --- Scientific Calculator ---
export const ScientificCalculator = () => {
  const [display, setDisplay] = usePersistentState<string>('sci_display', '0');
  const [memory, setMemory] = usePersistentState<number>('sci_memory', 0);
  const [isRadians, setIsRadians] = usePersistentState<boolean>('sci_radians', false); // false = Degrees
  const [isSecond, setIsSecond] = useState<boolean>(false); // 2nd function toggle
  const [history, setHistory] = usePersistentState<string>('sci_history', '');
  const [error, setError] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      
      // Prevent default for calculator keys to avoid browser scrolling/actions
      if (['/', '*', '-', '+', 'Enter', 'Backspace', 'Escape', '(', ')'].includes(key)) {
        e.preventDefault();
      }

      if (key >= '0' && key <= '9') handleInput(key);
      if (key === '.') handleInput('.');
      if (key === '+') handleInput('+');
      if (key === '-') handleInput('-');
      if (key === '*' || key.toLowerCase() === 'x') handleInput('×');
      if (key === '/') handleInput('÷');
      if (key === 'Enter' || key === '=') calculate();
      if (key === 'Backspace') handleInput('DEL');
      if (key === 'Escape') handleInput('C');
      if (key === '(') handleInput('(');
      if (key === ')') handleInput(')');
      if (key === '^') handleInput('^');
      if (key === '!') handleInput('!');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [display]);

  const safeEval = (expr: string) => {
    try {
      // 1. Pre-process formatting
      let evalStr = expr
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'Math.PI')
        .replace(/\be\b/g, 'Math.E') // Only match isolated 'e' (Euler's number), ignore 'exp' or '1E5'
        .replace(/\^/g, '**');

      // 2. Handle factorial (n!) - simplistic replacement for single digits or parenthesized groups
      // Note: A full parser is better, but regex works for simple cases like 5!
      // This simple regex handles single numbers followed by !
      evalStr = evalStr.replace(/(\d+)!/g, (_, n) => {
        let f = 1; for(let i=1; i<=parseInt(n); i++) f*=i; return f.toString();
      });

      // 3. Handle Functions
      // Wrapper to handle Degrees vs Radians for trig
      const toRad = (n: number) => isRadians ? n : n * (Math.PI / 180);
      const toDeg = (n: number) => isRadians ? n : n * (180 / Math.PI);
      
      // We expose helper functions to the evaluation scope
      const scope = {
        sin: (x: number) => Math.sin(toRad(x)),
        cos: (x: number) => Math.cos(toRad(x)),
        tan: (x: number) => Math.tan(toRad(x)),
        asin: (x: number) => toDeg(Math.asin(x)),
        acos: (x: number) => toDeg(Math.acos(x)),
        atan: (x: number) => toDeg(Math.atan(x)),
        log: (x: number) => Math.log10(x),
        ln: (x: number) => Math.log(x),
        sqrt: Math.sqrt,
        cbrt: Math.cbrt,
        abs: Math.abs,
        exp: Math.exp,
        Math: Math
      };

      // Replace function names with scope calls
      // e.g. sin(90) -> scope.sin(90)
      const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 'abs', 'exp'];
      funcs.forEach(f => {
        const regex = new RegExp(`\\b${f}\\(`, 'g');
        evalStr = evalStr.replace(regex, `scope.${f}(`);
      });

      // Execute
      // eslint-disable-next-line no-new-func
      const func = new Function('scope', `with(scope) { return ${evalStr} }`);
      const result = func(scope);

      if (Number.isNaN(result)) return 'Invalid Input';
      if (!Number.isFinite(result)) return 'Infinity';
      
      // Precision handling
      return String(Math.round(result * 10000000000) / 10000000000);
    } catch (e) {
      return 'Syntax Error';
    }
  };

  const calculate = () => {
    if (error) { setDisplay('0'); setError(false); return; }
    setHistory(`${display} =`);
    const res = safeEval(display);
    setDisplay(res);
    // If res is an error message, set error state so next input clears it
    if (['Invalid Input', 'Infinity', 'Syntax Error', 'Error'].includes(res)) {
      setError(true);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInput = useCallback((val: string) => {
    if (error) { setDisplay('0'); setError(false); }
    
    if (val === 'C') {
      setDisplay('0');
      setHistory('');
      setError(false);
    } else if (val === 'DEL') {
      setDisplay(prev => {
        if (prev.length <= 1 || ['Invalid Input', 'Infinity', 'Syntax Error', 'Error'].includes(prev)) return '0';
        // Remove function names fully (e.g. deleting 'sin(')
        if (prev.endsWith('(')) {
          // Check for known functions
          const funcs = ['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'log', 'ln', 'sqrt', 'cbrt', 'abs', 'exp'];
          for (const f of funcs) {
            if (prev.endsWith(`${f}(`)) return prev.slice(0, -(f.length + 1)) || '0';
          }
        }
        return prev.slice(0, -1);
      });
    } else if (val === '=') {
      calculate();
    } else if (['sin', 'cos', 'tan', 'asin', 'acos', 'atan', 'cbrt', 'log', 'ln', 'sqrt', 'abs'].includes(val)) {
      setDisplay(prev => prev === '0' ? `${val}(` : `${prev}${val}(`);
    } else if (val === '10x') {
      setDisplay(prev => prev === '0' ? '10^' : `${prev}*10^`);
    } else if (val === 'inv') {
      setDisplay(prev => prev === '0' ? '1/' : `${prev}^-1`); // Simplified representation
    } else if (val === 'mod') {
      setDisplay(prev => prev + '%'); // JS uses % for mod
    } else if (val === 'exp') {
       setDisplay(prev => prev === '0' ? '0E' : prev + 'E'); // Scientific Notation E
    } else {
      setDisplay(prev => prev === '0' && val !== '.' && !['+', '-', '×', '÷', '^', ')', '!', 'E'].includes(val) ? val : prev + val);
    }
  }, [error, calculate]);

  // Memory Functions
  const memClear = () => setMemory(0);
  const memRecall = () => setDisplay(prev => prev === '0' ? String(memory) : prev + String(memory));
  const memAdd = () => {
    const val = parseFloat(display);
    if (!isNaN(val)) setMemory(m => m + val);
  };
  const memSub = () => {
    const val = parseFloat(display);
    if (!isNaN(val)) setMemory(m => m - val);
  };
  const memStore = () => {
    const val = parseFloat(display);
    if (!isNaN(val)) setMemory(val);
  };

  const btnClass = "relative h-12 sm:h-14 rounded-lg font-medium text-base sm:text-lg flex items-center justify-center select-none transition-all duration-75 shadow-[0_2px_0_0_rgba(0,0,0,0.1)] dark:shadow-[0_2px_0_0_rgba(255,255,255,0.05)] active:shadow-none active:translate-y-[2px] hover:brightness-110";
  const numClass = `${btnClass} bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700`;
  const opClass = `${btnClass} bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200`;
  const actionClass = `${btnClass} bg-blue-50 dark:bg-blue-900/20 text-primary border border-blue-100 dark:border-blue-800`;
  const primaryClass = `${btnClass} bg-primary text-white shadow-[0_2px_0_0_#1e40af]`;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <SEO 
        title="Scientific Calculator | Advanced Online Math Tool" 
        description="Perform complex mathematical operations including trigonometry, logarithms, exponentials, and memory functions. A free, online scientific calculator for students and engineers." 
        keywords={['scientific calculator', 'online calculator', 'trigonometry', 'logarithms', 'exponent']}
        schemaType="Calculator"
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Scientific Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Perform complex mathematical operations with ease using our advanced Scientific Calculator. Featuring trigonometry, logarithms, exponentials, and memory functions, this tool is perfect for students, engineers, and professionals needing precise calculations directly in the browser.
        </p>
      </div>

      <AdInlineCalculator />

      {/* Calculator Body */}
      <div className="bg-white dark:bg-dark-lighter p-4 sm:p-6 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-800">
        
        {/* Screen */}
        <div className="mb-4 bg-gray-50 dark:bg-dark p-4 rounded-xl border-inner shadow-inner border border-gray-200 dark:border-gray-700 h-28 flex flex-col justify-between relative group">
          <div className="flex justify-between items-start">
             <button 
                onClick={handleCopy}
                className="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-primary transition-all"
                title="Copy to clipboard"
             >
                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
             </button>
             <div className="text-gray-400 text-xs sm:text-sm font-mono h-6 truncate text-right flex-1">{history}</div>
          </div>
          <div className="text-3xl sm:text-4xl font-mono font-bold text-gray-900 dark:text-white break-all tracking-wider text-right">{display}</div>
        </div>

        {/* Toolbar (Deg/Rad, F-E) */}
        <div className="flex justify-between items-center mb-3 px-1">
            <div className="flex gap-2">
                <button onClick={() => setIsRadians(!isRadians)} className="text-xs font-bold px-2 py-1 rounded bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                    {isRadians ? 'RAD' : 'DEG'}
                </button>
            </div>
            <div className="text-xs text-gray-400">
                {memory !== 0 && <span className="font-bold text-primary">M</span>}
            </div>
        </div>

        {/* Memory Row */}
        <div className="grid grid-cols-5 gap-2 mb-3">
            {['MC', 'MR', 'M+', 'M-', 'MS'].map(m => (
                <button 
                  key={m} 
                  onClick={() => {
                      if(m==='MC') memClear();
                      if(m==='MR') memRecall();
                      if(m==='M+') memAdd();
                      if(m==='M-') memSub();
                      if(m==='MS') memStore();
                  }}
                  className="text-xs font-semibold py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 disabled:opacity-30 transition-colors"
                  disabled={m !== 'MS' && m !== 'M+' && m !== 'M-' && memory === 0}
                >
                    {m}
                </button>
            ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-5 gap-2 sm:gap-3">
            {/* Row 1 */}
            <button onClick={() => setIsSecond(!isSecond)} className={`${opClass} text-sm ${isSecond ? 'bg-primary text-white border-primary' : ''}`}>2nd</button>
            <button onClick={() => handleInput('π')} className={opClass}>π</button>
            <button onClick={() => handleInput('e')} className={opClass}>e</button>
            <button onClick={() => handleInput('C')} className={`${opClass} text-red-500 font-bold`}>C</button>
            <button onClick={() => handleInput('DEL')} className={`${opClass} text-orange-500`}><Delete className="w-5 h-5" /></button>

            {/* Row 2 */}
            <button onClick={() => handleInput('^2')} className={opClass}>x²</button>
            <button onClick={() => handleInput('inv')} className={opClass}>1/x</button>
            <button onClick={() => handleInput('abs')} className={opClass}>|x|</button>
            <button onClick={() => handleInput('exp')} className={opClass}>exp</button>
            <button onClick={() => handleInput('mod')} className={opClass}>mod</button>

            {/* Row 3 */}
            <button onClick={() => handleInput('sqrt')} className={opClass}>√x</button>
            <button onClick={() => handleInput('(')} className={opClass}>({isSecond ? '' : ''}</button>
            <button onClick={() => handleInput(')')} className={opClass}>)</button>
            <button onClick={() => handleInput('!')} className={opClass}>n!</button>
            <button onClick={() => handleInput('÷')} className={actionClass}>÷</button>

            {/* Row 4 */}
            <button onClick={() => handleInput('^')} className={opClass}>xʸ</button>
            <button onClick={() => handleInput('7')} className={numClass}>7</button>
            <button onClick={() => handleInput('8')} className={numClass}>8</button>
            <button onClick={() => handleInput('9')} className={numClass}>9</button>
            <button onClick={() => handleInput('×')} className={actionClass}>×</button>

            {/* Row 5 */}
            <button onClick={() => handleInput('10x')} className={opClass}>10ˣ</button>
            <button onClick={() => handleInput('4')} className={numClass}>4</button>
            <button onClick={() => handleInput('5')} className={numClass}>5</button>
            <button onClick={() => handleInput('6')} className={numClass}>6</button>
            <button onClick={() => handleInput('-')} className={actionClass}>-</button>

            {/* Row 6 */}
            <button onClick={() => handleInput(isSecond ? 'log' : 'log')} className={opClass}>log</button>
            <button onClick={() => handleInput('1')} className={numClass}>1</button>
            <button onClick={() => handleInput('2')} className={numClass}>2</button>
            <button onClick={() => handleInput('3')} className={numClass}>3</button>
            <button onClick={() => handleInput('+')} className={actionClass}>+</button>

            {/* Row 7 */}
            <button onClick={() => handleInput(isSecond ? 'ln' : 'ln')} className={opClass}>ln</button>
            <button onClick={() => handleInput('-')} className={numClass}>+/-</button>
            <button onClick={() => handleInput('0')} className={numClass}>0</button>
            <button onClick={() => handleInput('.')} className={numClass}>.</button>
            <button onClick={calculate} className={primaryClass}>=</button>

            {/* Row 8 (Trig Specifics) */}
            <button onClick={() => handleInput(isSecond ? 'asin' : 'sin')} className={`${opClass} text-sm`}>{isSecond ? 'sin⁻¹' : 'sin'}</button>
            <button onClick={() => handleInput(isSecond ? 'acos' : 'cos')} className={`${opClass} text-sm`}>{isSecond ? 'cos⁻¹' : 'cos'}</button>
            <button onClick={() => handleInput(isSecond ? 'atan' : 'tan')} className={`${opClass} text-sm`}>{isSecond ? 'tan⁻¹' : 'tan'}</button>
            <button onClick={() => handleInput('cbrt')} className={opClass}>∛x</button>
             {/* Filler to keep grid 5xX */}
            <button onClick={() => handleInput('^3')} className={opClass}>x³</button>
        </div>
      </div>

      {/* Keyboard Shortcuts Hint */}
      <div className="text-center text-xs text-gray-400">
        Keyboard Shortcuts: Enter (=), Esc (Clear), Backspace (Del), trig keys map to functions
      </div>
    </div>
  );
};

// --- Percentage Calculator ---
export const PercentageCalculator = () => {
  const [val1, setVal1] = usePersistentState<string>('perc_val1', '');
  const [val2, setVal2] = usePersistentState<string>('perc_val2', '');
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = usePersistentState<number>('perc_mode', 0);

  const modes = [
    { label: 'Percentage of', desc: 'What is X% of Y?' },
    { label: 'Percentage is', desc: 'X is what % of Y?' },
    { label: '% Change', desc: 'Change from X to Y?' },
  ];

  const calculate = () => {
    const v1 = parseFloat(val1);
    const v2 = parseFloat(val2);
    if (isNaN(v1) || isNaN(v2)) return;

    let res = 0;
    if (mode === 0) res = (v1 / 100) * v2;
    else if (mode === 1) res = (v1 / v2) * 100;
    else if (mode === 2) res = ((v2 - v1) / v1) * 100;

    setResult(res.toFixed(2));
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <SEO 
        title="Percentage Calculator | Free Online Percentage Tool" 
        description="Instantly calculate percentages, find percentage increases or decreases, and solve 'percentage of' problems. A simple tool for discounts, tips, and math." 
        schemaType="Calculator"
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Percentage Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Instantly solve any percentage-related problem. Whether you need to find a percentage of a number, calculate the percentage increase between two values, or determine what percentage one number is of another, this versatile tool simplifies math for discounts, taxes, and growth analysis.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {modes.map((m, i) => (
            <button
              key={i}
              onClick={() => { setMode(i); setResult(null); }}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all active:scale-95 flex-shrink-0 ${
                mode === i 
                  ? 'bg-primary text-white shadow-md shadow-blue-500/20' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-center mb-4 text-gray-800 dark:text-gray-200">{modes[mode].desc}</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-500 font-medium">Value X</label>
              <input 
                type="number" 
                value={val1} 
                onChange={e => setVal1(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow"
                placeholder="Enter X"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500 font-medium">Value Y</label>
              <input 
                type="number" 
                value={val2} 
                onChange={e => setVal2(e.target.value)}
                className="w-full p-3 bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary outline-none transition-shadow"
                placeholder="Enter Y"
              />
            </div>
          </div>

          <button 
            onClick={calculate} 
            className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/30 active:scale-95 active:shadow-sm"
          >
            Calculate
          </button>

          {result !== null && (
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800/50 rounded-xl text-center animate-fade-in">
              <span className="text-sm text-green-600 dark:text-green-400 font-medium uppercase tracking-wider">Result</span>
              <div className="text-4xl font-bold text-green-700 dark:text-green-300 mt-2">
                {result}{mode === 0 ? '' : '%'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
