import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  /** id of the element that names the dialog (usually the heading). */
  labelledBy: string;
  closeLabel: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const SIZE: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg'
};

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible dialog shell: Escape / backdrop to close, focus trap,
 * focus restore, and body scroll lock. Rendered in-tree (not portaled)
 * so it inherits the active mode theme variables.
 */
export const Modal: React.FC<ModalProps> = ({ open, onClose, labelledBy, closeLabel, size = 'md', children }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const first = panel?.querySelector<HTMLElement>('[data-autofocus]') ?? panel?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstNode) {
        e.preventDefault();
        lastNode.focus();
      } else if (!e.shiftKey && document.activeElement === lastNode) {
        e.preventDefault();
        firstNode.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-6">
      <div
        className="absolute inset-0 bg-[#0b0f1a]/55 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className={`card relative w-full ${SIZE[size]} max-h-[90vh] overflow-y-auto scroll-thin p-6 md:p-7 text-ink animate-pop-in`}
      >
        <button
          type="button"
          onClick={onClose}
          className="btn btn-ghost btn-icon absolute top-3 right-3 rounded-full"
          aria-label={closeLabel}
        >
          <X size={20} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps {
  id: string;
  eyebrow: string;
  title: string;
  icon: React.ReactNode;
  iconClassName?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ id, eyebrow, title, icon, iconClassName = 'bg-primary text-on-primary' }) => (
  <div className="flex items-center gap-3.5 mb-5 pr-10">
    <div className={`w-12 h-12 shrink-0 rounded-2xl flex items-center justify-center shadow-md ${iconClassName}`}>
      {icon}
    </div>
    <div className="min-w-0">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="text-xl md:text-2xl font-semibold leading-tight text-ink">
        {title}
      </h2>
    </div>
  </div>
);
