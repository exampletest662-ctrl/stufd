import type { Metadata, Viewport } from 'next'
import { ReduxProvider } from '@/components/providers/ReduxProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'FoodDash — Good food. Good mood.',
  description: 'Discover the best local restaurants, delivered fresh and fast to your door.',
  generator: 'FoodDash',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f0e8',
  userScalable: true,
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-background">
      <body className="antialiased">
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  )
}
