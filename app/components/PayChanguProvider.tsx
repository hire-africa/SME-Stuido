'use client'

import { useEffect, useState } from 'react'

export function PayChanguProvider({ children }: { children: React.ReactNode }) {
  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useEffect(() => {
    const loadScripts = () => {
      // Check if jQuery is already loaded
      if ((window as any).$ && (window as any).jQuery) {
        // jQuery already loaded, just load PayChangu
        if (!(window as any).PaychanguCheckout) {
          const script = document.createElement('script')
          script.src = 'https://in.paychangu.com/js/popup.js'
          script.type = 'text/javascript'
          script.onload = () => setScriptsLoaded(true)
          script.onerror = () => setScriptsLoaded(true)
          document.body.appendChild(script)
        } else {
          setScriptsLoaded(true)
        }
        return
      }

      // Load jQuery first
      const jqueryScript = document.createElement('script')
      jqueryScript.src = 'https://code.jquery.com/jquery-3.6.0.min.js'
      jqueryScript.type = 'text/javascript'
      
      jqueryScript.onload = () => {
        // jQuery loaded, now load PayChangu
        setTimeout(() => {
          if (!(window as any).PaychanguCheckout) {
            const paychanguScript = document.createElement('script')
            paychanguScript.src = 'https://in.paychangu.com/js/popup.js'
            paychanguScript.type = 'text/javascript'
            paychanguScript.onload = () => setScriptsLoaded(true)
            paychanguScript.onerror = () => setScriptsLoaded(true)
            document.body.appendChild(paychanguScript)
          } else {
            setScriptsLoaded(true)
          }
        }, 100)
      }
      
      jqueryScript.onerror = () => {
        // jQuery failed to load, try PayChangu anyway
        setTimeout(() => {
          if (!(window as any).PaychanguCheckout) {
            const paychanguScript = document.createElement('script')
            paychanguScript.src = 'https://in.paychangu.com/js/popup.js'
            paychanguScript.type = 'text/javascript'
            paychanguScript.onload = () => setScriptsLoaded(true)
            paychanguScript.onerror = () => setScriptsLoaded(true)
            document.body.appendChild(paychanguScript)
          } else {
            setScriptsLoaded(true)
          }
        }, 100)
      }
      
      document.body.appendChild(jqueryScript)
    }

    loadScripts()
  }, [])

  return <>{children}</>
}
