/**
 * AIROX 2026 - Accessible Modal Component
 * Dylanbrouwer style: 14.4px panel border radius, hairline borders, 
 * paper/onyx canvas surfaces, cubic-bezier weighted transitions.
 */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'lg',
}) => {
  // Lock body scroll on open & handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      (window as any).lenis?.stop();
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = 'unset';
      (window as any).lenis?.start();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-hidden"
          data-lenis-prevent
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            onClick={onClose}
            className="fixed inset-0 bg-[#000000]/85 backdrop-blur-md z-[99999]"
            aria-hidden="true"
          />

          {/* Dialog Panel Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className={`
              relative w-full ${maxWidthClasses[maxWidth]} my-auto
              bg-[#0a0d14] border border-cyan-500/30 rounded-[20px]
              shadow-[0_25px_60px_rgba(0,0,0,0.95)] z-[100000] text-white
              flex flex-col max-h-[85vh] sm:max-h-[88vh] overflow-hidden
            `}
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? 'modal-title' : undefined}
            data-lenis-prevent
          >
            {/* Header */}
            {(title || subtitle) && (
              <div className="flex-shrink-0 flex items-start justify-between p-5 sm:p-6 border-b border-cyan-500/20 bg-[#0f1422]">
                <div>
                  {title && (
                    <h3 id="modal-title" className="text-xl font-black text-white font-sans tracking-tight">
                      {title}
                    </h3>
                  )}
                  {subtitle && (
                    <p className="text-xs text-gray-400 font-mono uppercase mt-1 tracking-wider">
                      {subtitle}
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/20"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {!title && !subtitle && (
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            {/* Content Body */}
            <div
              className="p-5 sm:p-6 overflow-y-auto overscroll-contain bg-[#0a0d14] text-gray-100 flex-1 min-h-0"
              data-lenis-prevent
            >
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

