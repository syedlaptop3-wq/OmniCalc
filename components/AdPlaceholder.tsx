
export const AdPlaceholder = ({ id, className = "" }: { id: string, className?: string }) => (
  <div id={id} className={`bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-400 text-sm font-medium p-4 my-4 ${className}`}>
    <span className="opacity-50">Ad Space ({id})</span>
  </div>
);

export const AdInlineCalculator = () => (
  <AdPlaceholder id="ad-inline-calculator" className="w-full h-24 rounded-xl" />
);