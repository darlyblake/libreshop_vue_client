import type { Metadata } from 'next'
import { Work_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Footer } from '@/components/Footer'
import './globals.css'
import { DbProvider } from './providers/DbProvider'
import { CartProvider } from './providers/CartProvider'

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: '--font-display'
});

export const metadata: Metadata = {
  title: 'LibreShop - Votre boutique en ligne',
  description: 'Découvrez une large gamme de produits sur LibreShop',
  keywords: 'boutique en ligne, ecommerce, produits, shopping, LibreShop',
  authors: [{ name: 'LibreShop Team' }],
  creator: 'LibreShop',
  publisher: 'LibreShop',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'LibreShop - Votre boutique en ligne',
    description: 'Découvrez une large gamme de produits sur LibreShop',
    url: '/',
    siteName: 'LibreShop',
    images: [
      {
        url: '/bustling-shopping-center.png',
        width: 1200,
        height: 630,
        alt: 'LibreShop - Boutique en ligne',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LibreShop - Votre boutique en ligne',
    description: 'Découvrez une large gamme de produits sur LibreShop',
    images: ['/bustling-shopping-center.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification-code',
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/placeholder-logo.svg',
    apple: '/placeholder-logo.svg',
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const isAuthPage = typeof window !== 'undefined' && (window.location.pathname === '/login' || window.location.pathname === '/register');

  return (
    <html lang="fr" className="light">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
      </head>
      <body className={`${workSans.variable} font-display antialiased bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200`}>
        <DbProvider>
          <CartProvider>
            {children}
            {!isAuthPage && <Footer />}
          </CartProvider>
        </DbProvider>
        <Analytics />
      </body>
    </html>
  )
}
