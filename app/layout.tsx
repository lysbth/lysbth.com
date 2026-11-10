import type { Metadata, Viewport } from 'next';
import { Inter, Major_Mono_Display } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const majorMono = Major_Mono_Display({ weight: '400', subsets: ['latin'], variable: '--font-major-mono' });
const inter = Inter({ weight: '500', subsets: ['latin'], variable: '--font-inter' });

const title = 'lysbth — graphic design, Rotterdam';
const description = 'Graphic designer in Rotterdam. Portfolio coming soon. Open for job opportunities.';

export const metadata: Metadata = {
  metadataBase: new URL('https://lysbth.com'),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/', title, description },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0b0b0a',
};

/* Without JavaScript: skip the loader and show the card straight away. */
const noScriptCss = '<style>.loader{display:none!important}.stage{opacity:1!important;transform:none!important}</style>';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${majorMono.variable} ${inter.variable}`}>
      <body>
        <noscript dangerouslySetInnerHTML={{ __html: noScriptCss }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
