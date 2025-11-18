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
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="https://in.paychangu.com/js/popup.js"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Ensure PayChangu is available globally
            window.PaychanguCheckoutReady = false;
            if (typeof window !== 'undefined') {
              const checkPayChangu = setInterval(() => {
                if (typeof window.PaychanguCheckout !== 'undefined') {
                  window.PaychanguCheckoutReady = true;
                  clearInterval(checkPayChangu);
                }
              }, 100);
            }
          `
        }} />
      </head>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
