import { useState, useEffect } from 'react';
import { SEO } from '../components/SEO';
import { UNIT_CONVERSIONS } from '../constants';
import { usePersistentState } from '../hooks/usePersistentState';
import { AdInlineCalculator } from '../components/AdPlaceholder';

// --- Base Converter ---
export const BaseConverter = () => {
  const [dec, setDec] = usePersistentState<string>('base_dec', '');
  const [hex, setHex] = usePersistentState<string>('base_hex', '');
  const [bin, setBin] = usePersistentState<string>('base_bin', '');
  const [oct, setOct] = usePersistentState<string>('base_oct', '');

  const update = (val: string, base: number) => {
    if (val === '') {
      setDec(''); setHex(''); setBin(''); setOct('');
      return;
    }
    const num = parseInt(val, base);
    if (!isNaN(num)) {
      setDec(num.toString(10));
      setHex(num.toString(16).toUpperCase());
      setBin(num.toString(2));
      setOct(num.toString(8));
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <SEO
        title="Number Base Converter | Binary, Hex, Decimal"
        description="Convert numbers between Binary, Decimal, Hexadecimal, and Octal instantly. Essential tool for programmers and developers."
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Number Base Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Seamlessly convert numbers between different numeral systems. Designed for programmers and computer scientists, this tool translates values between Binary (Base 2), Octal (Base 8), Decimal (Base 10), and Hexadecimal (Base 16) in real-time.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">DECIMAL</label>
            <input type="text" value={dec} onChange={e => update(e.target.value, 10)} className="w-full p-3 font-mono bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="10" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">HEXADECIMAL</label>
            <input type="text" value={hex} onChange={e => update(e.target.value, 16)} className="w-full p-3 font-mono bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="A" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">BINARY</label>
            <input type="text" value={bin} onChange={e => update(e.target.value, 2)} className="w-full p-3 font-mono bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="1010" />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 mb-1 block">OCTAL</label>
            <input type="text" value={oct} onChange={e => update(e.target.value, 8)} className="w-full p-3 font-mono bg-gray-50 dark:bg-dark border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary outline-none" placeholder="12" />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Password Generator ---
export const PasswordGenerator = () => {
  const [length, setLength] = usePersistentState<number>('pwd_len', 12);
  const [useSymbols, setUseSymbols] = usePersistentState<boolean>('pwd_sym', true);
  const [useNumbers, setUseNumbers] = usePersistentState<boolean>('pwd_num', true);
  const [password, setPassword] = useState('');

  const generate = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const syms = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let validChars = chars;
    if (useNumbers) validChars += nums;
    if (useSymbols) validChars += syms;

    let pass = '';
    for (let i = 0; i < length; i++) {
      pass += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }
    setPassword(pass);
  };

  return (
    <div className="max-w-md mx-auto space-y-6">
      <SEO
        title="Secure Password Generator | Random Password Creator"
        description="Generate strong, secure, and random passwords instantly. Customize length, numbers, and symbols to protect your online accounts."
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Secure Password Generator</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Enhance your online security with strong, custom-generated passwords. Create unique strings of varying lengths including uppercase letters, numbers, and symbols. This client-side tool ensures your passwords are created locally and never shared, keeping your accounts safe.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="mb-6 bg-gray-100 dark:bg-dark p-4 rounded-xl text-center break-all font-mono text-lg min-h-[60px] flex items-center justify-center border border-gray-200 dark:border-gray-700 select-all">
          {password || <span className="text-gray-400 text-sm">Click generate below</span>}
        </div>
        <div className="space-y-6">
          <div>
            <label className="flex justify-between text-sm font-medium mb-2">
              <span>Length</span>
              <span className="text-primary font-bold">{length}</span>
            </label>
            <input type="range" min="6" max="32" value={length} onChange={e => setLength(Number(e.target.value))} className="w-full accent-primary h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
          </div>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={useNumbers} onChange={e => setUseNumbers(e.target.checked)} className="w-4 h-4 accent-primary rounded" />
              <span className="text-sm">Numbers</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" checked={useSymbols} onChange={e => setUseSymbols(e.target.checked)} className="w-4 h-4 accent-primary rounded" />
              <span className="text-sm">Symbols</span>
            </label>
          </div>
          <button
            onClick={generate}
            className="w-full py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 transition-all active:scale-95 shadow-lg shadow-green-500/20 active:shadow-sm"
          >
            Generate Password
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Unit Converter ---
export const UnitConverter = () => {
  const [category, setCategory] = usePersistentState<string>('unit_cat', 'length');
  const [fromUnit, setFromUnit] = usePersistentState<string>('unit_from', 'meters');
  const [toUnit, setToUnit] = usePersistentState<string>('unit_to', 'feet');
  const [value, setValue] = usePersistentState<number>('unit_val', 1);
  const [result, setResult] = useState(0);

  useEffect(() => {
    const validUnits = UNIT_CONVERSIONS[category];
    if (!validUnits) return;

    // Validate selections when switching categories
    const currentFromValid = validUnits[fromUnit] !== undefined;
    const currentToValid = validUnits[toUnit] !== undefined;

    let activeFrom = fromUnit;
    let activeTo = toUnit;

    if (!currentFromValid) {
      activeFrom = Object.keys(validUnits)[0];
      setFromUnit(activeFrom);
    }
    if (!currentToValid) {
      activeTo = Object.keys(validUnits)[1] || Object.keys(validUnits)[0];
      setToUnit(activeTo);
    }

    // Special logic for Temperature (non-linear)
    if (category === 'temperature') {
      let valInC = value;
      // Step 1: Convert Input -> Celsius
      if (activeFrom === 'fahrenheit') {
        valInC = (value - 32) * (5 / 9);
      } else if (activeFrom === 'kelvin') {
        valInC = value - 273.15;
      }

      // Step 2: Convert Celsius -> Output
      let finalRes = valInC;
      if (activeTo === 'fahrenheit') {
        finalRes = (valInC * (9 / 5)) + 32;
      } else if (activeTo === 'kelvin') {
        finalRes = valInC + 273.15;
      }

      setResult(finalRes);
      return;
    }

    // Standard linear conversion for Length, Weight, Volume, Area
    const fromFactor = UNIT_CONVERSIONS[category]?.[activeFrom] || 1;
    const toFactor = UNIT_CONVERSIONS[category]?.[activeTo] || 1;

    // Logic: baseValue = value / fromFactor (converts to base unit)
    // result = baseValue * toFactor (converts base unit to target)
    const baseValue = value / fromFactor;
    setResult(baseValue * toFactor);

  }, [category, fromUnit, toUnit, value, setFromUnit, setToUnit]);

  const units = Object.keys(UNIT_CONVERSIONS[category] || {});

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <SEO
        title="Universal Unit Converter | Length, Weight, Temperature, Volume"
        description="Convert measurements effortlessly between metric and imperial units. Supports length, weight, temperature, volume, area, and more."
      />

      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">Universal Unit Converter</h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
          Convert measurements across various categories with speed and accuracy. From length and weight to temperature, volume and area, this Universal Unit Converter simplifies unit transformation for cooking, construction, scientific work, and everyday tasks.
        </p>
      </div>

      <AdInlineCalculator />

      <div className="bg-white dark:bg-dark-lighter p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="flex gap-2 overflow-x-auto mb-8 pb-2 scrollbar-hide">
          {Object.keys(UNIT_CONVERSIONS).map(cat => (
            <button
              key={cat}
              onClick={() => { setCategory(cat); }}
              className={`px-4 py-2 rounded-full capitalize text-sm font-medium transition-colors whitespace-nowrap ${category === cat
                  ? 'bg-primary text-white shadow-md shadow-blue-500/20'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-center">
          <div className="space-y-2">
            <input type="number" value={value} onChange={e => setValue(Number(e.target.value))} className="w-full p-3 border rounded-xl dark:bg-dark dark:border-gray-700 focus:ring-2 focus:ring-primary outline-none" />
            <select value={fromUnit} onChange={e => setFromUnit(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-dark dark:border-gray-700 capitalize text-sm">
              {units.map(u => <option key={u} value={u}>{u.replace(/_/g, ' ')}</option>)}
            </select>
          </div>

          <div className="text-2xl text-gray-300 dark:text-gray-600 font-light text-center hidden md:block">=</div>

          <div className="space-y-2">
            <div className="w-full p-3 bg-gray-50 dark:bg-dark border rounded-xl border-gray-200 dark:border-gray-700 font-bold overflow-hidden text-ellipsis truncate h-[50px] flex items-center">
              {result.toLocaleString(undefined, { maximumFractionDigits: 4 })}
            </div>
            <select value={toUnit} onChange={e => setToUnit(e.target.value)} className="w-full p-2 border rounded-lg dark:bg-dark dark:border-gray-700 capitalize text-sm">
              {units.map(u => <option key={u} value={u}>{u.replace(/_/g, ' ')}</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};