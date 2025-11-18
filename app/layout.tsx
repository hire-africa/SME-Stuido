import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'SME Studio AI - Build Your Business Documents',
  description: 'AI-powered business documents for African SMEs. Create proposals, pitch decks, loan applications, and more in minutes.',
  keywords: 'SME, business documents, AI, proposals, pitch deck, Malawi, Africa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script src="https://in.paychangu.com/js/popup.js"></script>
      </head>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
