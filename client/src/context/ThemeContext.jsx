import React, { createContext, useContext, useState, useEffect } from 'react';
import { THEMES, VALID_THEME_IDS } from '../data/themes';

const STORAGE_KEY = 'ac-theme';
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && VALID_THEME_IDS.includes(saved)) {
        return saved;
      }
    } catch {
      // In case localStorage is blocked or restricted
    }
    return 'emerald-gold';
  });

  const setTheme = (nextThemeId) => {
    if (!VALID_THEME_IDS.includes(nextThemeId)) return;
    setThemeState(nextThemeId);
    try {
      localStorage.setItem(STORAGE_KEY, nextThemeId);
    } catch {
      // In case localStorage is restricted
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    const activeObj = THEMES.find((t) => t.id === theme) || THEMES[0];
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', activeObj.ink);
    }
  }, [theme]);

  const activeTheme = THEMES.find((t) => t.id === theme) || THEMES[0];

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes: THEMES, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
