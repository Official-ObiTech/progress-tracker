import type { Metadata, Viewport } from 'next';

import { ThemeScript } from '@/components/theme/theme-script';
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
  // Browser chrome follows the active theme.
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8f9fb' },
    { media: '(prefers-color-scheme: dark)', color: '#0f1218' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: ThemeScript sets data-theme before React
    // hydrates, so the server and client markup differ on this attribute by
    // design.
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-canvas text-default flex min-h-full flex-col">
        {children}
      </body>
    </html>
  );
}
