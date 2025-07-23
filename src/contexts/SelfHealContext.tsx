import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SelfHealContextType {
  isHealing: boolean;
  toggleHealing: () => void;
  currentScenario: string;
  setCurrentScenario: (scenario: string) => void;
}

const SelfHealContext = createContext<SelfHealContextType | undefined>(undefined);

export const useSelfHeal = () => {
  const context = useContext(SelfHealContext);
  if (!context) {
    throw new Error('useSelfHeal must be used within a SelfHealProvider');
  }
  return context;
};

interface SelfHealProviderProps {
  children: ReactNode;
}

export const SelfHealProvider: React.FC<SelfHealProviderProps> = ({ children }) => {
  const [isHealing, setIsHealing] = useState(false);
  const [currentScenario, setCurrentScenario] = useState('normal');

  const toggleHealing = () => {
    setIsHealing(!isHealing);
  };

  // Persist healing mode in localStorage for cross-page consistency
  React.useEffect(() => {
    localStorage.setItem('selfheal-mode', isHealing ? 'on' : 'off');
  }, [isHealing]);

  React.useEffect(() => {
    const mode = localStorage.getItem('selfheal-mode');
    if (mode === 'on' && !isHealing) setIsHealing(true);
    if (mode === 'off' && isHealing) setIsHealing(false);
  }, [isHealing]);

  return (
    <SelfHealContext.Provider value={{
      isHealing,
      toggleHealing,
      currentScenario,
      setCurrentScenario
    }}>
      {children}
    </SelfHealContext.Provider>
  );
};
