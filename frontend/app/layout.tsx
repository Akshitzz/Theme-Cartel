import type { Metadata } from 'next'
import { Geist, Geist_Mono, Righteous, Orbitron, Space_Mono, IBM_Plex_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Toaster } from 'sonner'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });
const _righteous = Righteous({ subsets: ["latin"], weight: '400' });
const _orbitron = Orbitron({ subsets: ["latin"], weight: ['400', '700', '900'] });
const _spaceMono = Space_Mono({ subsets: ["latin"], weight: ['400', '700'] });
const _ibmPlexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ['400', '600', '700'] });

export const metadata: Metadata = {
  title: 'Theme-Cartel – Premium Design & Development Agency',
  description: 'Elevate your brand with custom Shopify themes, stunning 3D logos, animations, and graphic design. Trusted by 3000+ businesses.',
  generator: 'v0.app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'ThemeCartel – Premium Digital Agency',
    description: 'Custom Shopify themes, 3D design, animations, and brand identity',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <Toaster theme="dark" position="bottom-right" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
