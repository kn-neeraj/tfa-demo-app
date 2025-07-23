import React from 'react';
import { Bandage, Bug, Zap } from 'lucide-react';
import { useSelfHeal } from '../contexts/SelfHealContext';

const SelfHealToggle: React.FC = () => {
  const { isHealing, toggleHealing } = useSelfHeal();

  // Track scroll position to toggle sticky/fixed mode
  const [isSticky, setIsSticky] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 64); // Only fix after navbar height (assume 64px)
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={
      isSticky
        ? 'fixed left-0 right-0 top-16 w-full z-40' // fixed below navbar
        : 'sticky left-0 right-0 top-16 w-full z-40' // sticky below navbar
    }>
      <div className={`w-full border-b transition-all duration-300 ${
        isHealing 
          ? 'bg-orange-50/95 border-orange-200' 
          : 'bg-background border-border'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full transition-all duration-300 animate-bounce-slow ${
                isHealing 
                  ? 'bg-orange-100 text-orange-600 animate-pulse' 
                  : 'bg-gray-100 text-blue-800'
              }`}>
                {isHealing 
                  ? <Bandage className="w-4 h-4" style={{ transform: 'rotate(45deg)' }} />
                  : <Zap className="w-5 h-5" />}
              </div>
              <span className={`text-sm font-medium ${
                isHealing ? 'text-orange-700' : 'text-gray-700'
              }`}>
                Self-Heal Demo Mode
              </span>
              {!isHealing && (
                <>
                  <span className="hidden sm:inline-block max-w-[180px] whitespace-nowrap overflow-hidden text-ellipsis text-xs font-semibold text-orange-600 animate-pulse ml-2 bg-orange-100 px-2 py-1 rounded-full border border-orange-300 shadow">
                    Toggle Demo Mode
                  </span>
                  <span className="inline-block sm:hidden max-w-[80px] whitespace-nowrap overflow-hidden text-ellipsis text-xs font-semibold text-orange-500 animate-pulse ml-2 bg-orange-100 px-2 py-1 rounded-full border border-orange-300 shadow">
                    Toggle
                  </span>
                </>
              )}
              {isHealing && (
                <span className="text-xs text-orange-600 font-medium flex items-center gap-1 ml-2">
                  <Bug className="w-3 h-3" />
                  Locator Change Simulation Active
                </span>
              )}
            </div>
          
          <button
            onClick={toggleHealing}
            id="self-heal-demo-toggle"
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-md ${
              isHealing 
                ? 'bg-gradient-to-r from-orange-400 via-pink-400 to-yellow-400 focus:ring-orange-400' 
                : 'bg-gray-200 focus:ring-gray-500'
            }`}
            role="switch"
            aria-checked={isHealing}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow ${
                isHealing ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfHealToggle;
