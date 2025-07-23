import React from 'react';
import { Zap } from 'lucide-react';

interface SelfHealBannerProps {
  className?: string;
}

const SelfHealBanner: React.FC<SelfHealBannerProps> = ({ className }) => (
  <div className={`inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium ${className || ''}`}>
    <Zap className="w-4 h-4" />
    Self-Heal mode active - Elements are modified
  </div>
);

export default SelfHealBanner;
