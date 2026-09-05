import type { Metadata, Viewport } from 'next';

import { ThemeScript } from '@/components/theme/theme-script';
import { buttonClasses } from '@/components/ui';
import { siteConfig } from '@/config/site';

import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1218' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-canvas text-default flex min-h-full flex-col">
        {/*
          Skip link. Hidden until focused, then the first thing a keyboard user
          reaches. Without it, every page requires tabbing through the whole
          sidebar before reaching content.
        */}
        <a
          href="#main-content"
          className={buttonClasses({
            variant: 'primary',
            size: 'sm',
            className:
              'sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50',
          })}
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
