'use client';

import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes';
import { createContext, useContext, useCallback, ReactNode } from 'react';

interface ThemeTransitionContextType {
  switchTheme: (newTheme: string) => void;
}

const ThemeTransitionContext = createContext<ThemeTransitionContextType>({
  switchTheme: () => {},
});

export const useThemeTransition = () => useContext(ThemeTransitionContext);

function ThemeTransitionInner({ children }: { children: ReactNode }) {
  const { setTheme } = useTheme();

  const switchTheme = useCallback((newTheme: string) => {
    // Use native View Transitions API for smooth circular reveal
    if (typeof document !== 'undefined' && 'startViewTransition' in document) {
      document.startViewTransition(() => {
        setTheme(newTheme);
      });
    } else {
      // Fallback for browsers that don't support View Transitions
      setTheme(newTheme);
    }
  }, [setTheme]);

  return (
    <ThemeTransitionContext.Provider value={{ switchTheme }}>
      {children}
    </ThemeTransitionContext.Provider>
  );
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={true} disableTransitionOnChange>
      <ThemeTransitionInner>
        {children}
      </ThemeTransitionInner>
    </NextThemesProvider>
  );
}
