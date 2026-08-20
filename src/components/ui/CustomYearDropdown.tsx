/**
 * AIROX 2026 - Custom Rounded Dropdown Component
 * Replaces native OS select dropdowns with a custom UI featuring rounded corners,
 * glassmorphic popover styling, neon cyan focus states, and smooth animations.
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check } from 'lucide-react';

interface Option {
  label: string;
  value: string;
}

interface CustomYearDropdownProps {
  value: string;
  onChange: (value: string) => void;
  options?: Option[];
  placeholder?: string;
  error?: boolean;
}

const DEFAULT_OPTIONS: Option[] = [
  { label: '1st Year', value: '1st Year' },
  { label: '2nd Year', value: '2nd Year' },
  { label: '3rd Year', value: '3rd Year' },
  { label: 'Final Year / PG', value: 'Final Year' },
];

export const CustomYearDropdown: React.FC<CustomYearDropdownProps> = ({
  value,
  onChange,
  options = DEFAULT_OPTIONS,
  placeholder = 'Select Year of Study',
  error = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
    isAbove: boolean;
  }>({
    top: 0,
    left: 0,
    width: 0,
    isAbove: false,
  });

  const selectedOption = options.find((opt) => opt.value === value || opt.label === value);

  // Calculate position relative to viewport for fixed portal positioning
  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const estimatedMenuHeight = Math.min(options.length * 48 + 16, 260);

    const spaceBelow = viewportHeight - rect.bottom;
    const shouldFlipAbove = spaceBelow < estimatedMenuHeight && rect.top > estimatedMenuHeight;

    const top = shouldFlipAbove
      ? Math.max(8, rect.top - estimatedMenuHeight - 6)
      : rect.bottom + 6;

    const paddingX = 16;
    let left = rect.left;
    let width = rect.width;

    if (left + width > window.innerWidth - paddingX) {
      width = Math.min(width, window.innerWidth - paddingX * 2);
      left = Math.max(paddingX, window.innerWidth - width - paddingX);
    }

    setMenuStyle({
      top,
      left,
      width,
      isAbove: shouldFlipAbove,
    });
  }, [options.length]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition, true);
    }
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [isOpen, updatePosition]);

  // Close dropdown on click/touch outside
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full font-dm">
      {/* Trigger Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => {
          if (!isOpen) updatePosition();
          setIsOpen(!isOpen);
        }}
        className={`w-full flex items-center justify-between bg-[#111622] hover:bg-[#161c2b] border text-white text-base sm:text-sm rounded-full pl-6 pr-5 py-4 transition-all duration-200 cursor-pointer text-left select-none ${
          isOpen
            ? 'border-cyan-400 ring-2 ring-cyan-400/30 shadow-[0_0_20px_rgba(6,182,212,0.2)]'
            : error
            ? 'border-red-500'
            : 'border-white/20 hover:border-white/40'
        }`}
      >
        <span className="font-medium truncate text-white">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-cyan-400 shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Portal Menu attached to document.body to prevent clipping */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: menuStyle.isAbove ? 8 : -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: menuStyle.isAbove ? 8 : -8, scale: 0.98 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                style={{
                  position: 'fixed',
                  top: `${menuStyle.top}px`,
                  left: `${menuStyle.left}px`,
                  width: `${menuStyle.width}px`,
                  zIndex: 999999,
                }}
                className="p-2 bg-[#0d111a]/98 backdrop-blur-3xl border border-cyan-500/50 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.95)] overflow-hidden font-dm"
              >
                <div
                  className="flex flex-col gap-1 max-h-60 overflow-y-auto pr-1 dropdown-scrollbar overscroll-contain"
                  style={{ touchAction: 'pan-y' }}
                  data-lenis-prevent
                >
                  {options.map((option) => {
                    const isSelected = option.value === value || option.label === value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => handleSelect(option.value)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer text-left select-none ${
                          isSelected
                            ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]'
                            : 'text-gray-200 hover:bg-white/10 hover:text-white active:bg-cyan-500/10'
                        }`}
                      >
                        <span className="truncate pr-2">{option.label}</span>
                        {isSelected && <Check className="w-4 h-4 text-cyan-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
};
