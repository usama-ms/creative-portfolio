import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Usama Ahmad - Portfolio',
  description: 'Portfolio of Usama Ahmad - FullStack Developer',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}