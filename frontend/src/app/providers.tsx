'use client';
import { StackProvider, StackTheme } from '@stackframe/stack';
import { stackClientApp } from '@/stack/client';
import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <StackProvider app={stackClientApp}>
        <StackTheme>{children}</StackTheme>
      </StackProvider>
    </ThemeProvider>
  );
}
