import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

export const PaletteIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
    <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
    <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
    <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.563-2.512 5.563-5.563C22 6.5 17.5 2 12 2z" />
  </svg>
);

export const CheckIcon = ({ size = 14 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const ThemePicker = () => {
  const { theme, setTheme, themes } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const itemsRef = useRef([]);

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (e) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [isOpen]);

  // Focus active item when popover becomes open
  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      const timer = setTimeout(() => {
        itemsRef.current[focusedIndex]?.focus();
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isOpen, focusedIndex]);

  const togglePopover = () => {
    if (!isOpen) {
      const activeIdx = themes.findIndex((t) => t.id === theme);
      setFocusedIndex(activeIdx >= 0 ? activeIdx : 0);
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        togglePopover();
      }
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      triggerRef.current?.focus();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIdx = (focusedIndex + 1) % themes.length;
      setFocusedIndex(nextIdx);
      itemsRef.current[nextIdx]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIdx = (focusedIndex - 1 + themes.length) % themes.length;
      setFocusedIndex(prevIdx);
      itemsRef.current[prevIdx]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      setFocusedIndex(0);
      itemsRef.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      const lastIdx = themes.length - 1;
      setFocusedIndex(lastIdx);
      itemsRef.current[lastIdx]?.focus();
    } else if (e.key === 'Tab') {
      // Close on Tab out
      setIsOpen(false);
    }
  };

  const handleSelect = (themeId) => {
    setTheme(themeId);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="theme-picker-container" onKeyDown={handleKeyDown}>
      <button
        ref={triggerRef}
        type="button"
        id="theme-picker-trigger"
        className="theme-picker-btn"
        onClick={togglePopover}
        aria-label="Select theme palette"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="theme-picker-popover"
      >
        <PaletteIcon size={16} />
      </button>

      {isOpen && (
        <div
          ref={popoverRef}
          id="theme-picker-popover"
          className="theme-picker-popover"
          role="menu"
          aria-labelledby="theme-picker-trigger"
        >
          <div className="theme-popover-header">THEMES</div>
          {themes.map((t, idx) => {
            const isSelected = theme === t.id;
            return (
              <button
                key={t.id}
                ref={(el) => {
                  itemsRef.current[idx] = el;
                }}
                type="button"
                role="menuitemradio"
                aria-checked={isSelected}
                tabIndex={focusedIndex === idx ? 0 : -1}
                className={`theme-option-btn ${isSelected ? 'active' : ''}`}
                onClick={() => handleSelect(t.id)}
                onMouseEnter={() => setFocusedIndex(idx)}
              >
                <span className="theme-swatches" aria-hidden="true">
                  <span className="theme-swatch" style={{ backgroundColor: t.ink }} />
                  <span className="theme-swatch" style={{ backgroundColor: t.primary }} />
                  <span className="theme-swatch" style={{ backgroundColor: t.secondary }} />
                </span>
                <span className="theme-option-name">{t.name}</span>
                <span className="theme-check-mark" aria-hidden="true">
                  {isSelected && <CheckIcon size={13} />}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export const ThemeChipsMobile = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="theme-mobile-section" aria-label="Theme selector">
      <div className="theme-mobile-label">THEME</div>
      <div className="theme-chips-list" role="radiogroup" aria-label="Select theme">
        {themes.map((t) => {
          const isSelected = theme === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              className={`theme-chip ${isSelected ? 'active' : ''}`}
              onClick={() => setTheme(t.id)}
            >
              <span className="theme-swatches" aria-hidden="true">
                <span className="theme-swatch" style={{ backgroundColor: t.ink }} />
                <span className="theme-swatch" style={{ backgroundColor: t.primary }} />
                <span className="theme-swatch" style={{ backgroundColor: t.secondary }} />
              </span>
              <span className="theme-chip-name">{t.name}</span>
              {isSelected && (
                <span className="theme-chip-check" aria-hidden="true">
                  <CheckIcon size={12} />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
