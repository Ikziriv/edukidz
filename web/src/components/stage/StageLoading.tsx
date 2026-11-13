import React from 'react';
import { Sprout } from 'lucide-react';
import { useT } from '../../lib/i18n';

export const StageLoading: React.FC = () => {
  const t = useT();
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink" role="status">
      <div className="absolute inset-0 skeleton" aria-hidden="true" />
      <span className="relative w-14 h-14 rounded-2xl bg-surface/80 flex items-center justify-center text-primary shadow-md animate-float">
        <Sprout size={26} aria-hidden="true" />
      </span>
      <span className="relative font-display font-medium text-sm text-muted">
        {t('Menumbuhkan taman 3D…', 'Growing the 3D garden…')}
      </span>
    </div>
  );
};

