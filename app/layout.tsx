import { Inter } from 'next/font/google'
import './globals.css'
import clsx from 'clsx'
import Sidebar from '@/components/sidebar'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: "Felix Dusengimana",
    template: "%s | Felix Dusengimana"
  },
  description: 'Developer, writer, Creator, and Animator.',
  openGraph: {
    title: "Felix Dusengimana",
    description: 'Developer, writer, Creator, and Animator.',
    type: 'website',
    url: 'https://feldux.com',
    siteName: 'Felix Dusengimana',
    images: [
      {
        url: 'https://feldux.com/og.png',
        width: 1920,
        height: 1080,
        alt: 'Felix Dusengimana',
      },
    ],
    locale: 'en-US',
  },
  robots:{
    follow: true,
    index: true,
    googleBot: {
      follow: true,
      index: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: "Felix Dusengimana",
    card: 'summary_large_image',
  },
  icons:{
    shortcut: '/favicon.ico',
  },
  verification: {
    google: 'eZSdmzAXlLkKhNJzfgwDqWORghxnJ8qR9_CHdAh5-xw',
    yandex: '14d2e73487fa6c71',
  },
}

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
    lang="en"
    className={clsx('font-sans text-black bg-white dark:bg-black dark:text-white')}>
      <body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
        <Sidebar/>
        <main>
          {children}
        </main>
      </body>
    </html>
  )
}
