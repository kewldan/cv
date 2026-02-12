import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import type React from 'react'
import './globals.css'
import Aurora from '@/components/Aurora'
import BottomBar from '@/components/nav/bottom-bar'
import ThemeManager from '@/components/theme-manager'
import { ThemeProvider } from '@/components/ui/theme-provider'
import { SWRProvider } from '@/providers/swr'
import TelegramProvider from '@/providers/telegram'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
})

export const metadata: Metadata = {
  title: 'GradesTracker',
  description: 'by kwldn',
  icons: {
    icon: '/activity.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased w-screen overflow-x-hidden pb-16`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <div className='absolute -z-10 w-screen'>
            <Aurora
              colorStops={['#7cff67', '#B19EEF', '#5227FF']}
              blend={0.3}
              amplitude={3.0}
              speed={0.5}
            />
          </div>
          <SWRProvider>
            <TelegramProvider>
              {children}
              <BottomBar />
              <ThemeManager />
            </TelegramProvider>
          </SWRProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
