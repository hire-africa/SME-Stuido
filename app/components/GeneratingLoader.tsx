'use client'

import { useEffect, useState } from 'react'

export default function GeneratingLoader() {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState(0)

  const stages = [
    { label: 'Analyzing your business...', duration: 3000 },
    { label: 'Researching market insights...', duration: 3000 },
    { label: 'Crafting executive summary...', duration: 3000 },
    { label: 'Building financial projections...', duration: 3000 },
    { label: 'Finalizing proposal...', duration: 2000 },
  ]

  useEffect(() => {
    let currentProgress = 0
    let currentStage = 0
    let stageStartTime = Date.now()

    const interval = setInterval(() => {
      const now = Date.now()
      const elapsedInStage = now - stageStartTime
      const stageDuration = stages[currentStage].duration

      // Calculate progress within current stage
      const stageProgress = Math.min(elapsedInStage / stageDuration, 1)
      const baseProgress = (currentStage / stages.length) * 100
      const stageContribution = (stageProgress / stages.length) * 100

      currentProgress = baseProgress + stageContribution

      setProgress(Math.min(currentProgress, 95)) // Cap at 95% until complete

      // Move to next stage
      if (elapsedInStage >= stageDuration && currentStage < stages.length - 1) {
        currentStage++
        stageStartTime = now
        setStage(currentStage)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Main Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12 text-center">
          {/* Animated Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative w-24 h-24">
              {/* Outer rotating ring */}
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-emerald border-r-emerald animate-spin"></div>

              {/* Middle pulsing ring */}
              <div className="absolute inset-2 rounded-full border-2 border-blue-200 dark:border-blue-900 animate-pulse"></div>

              {/* Inner icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl animate-bounce" style={{ animationDelay: '0s' }}>
                  ✨
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-navy dark:text-white mb-2">Generating Your Proposal</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Please wait while we create your professional document...</p>

          {/* Stage Text */}
          <div className="mb-8 h-8">
            <p className="text-sm font-semibold text-emerald animate-pulse">{stages[stage].label}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              {/* Progress fill */}
              <div
                className="h-full bg-gradient-to-r from-blue-500 via-emerald to-green-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              ></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>

            {/* Progress percentage */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-semibold">{Math.round(progress)}%</p>
          </div>

          {/* Dots Animation */}
          <div className="flex justify-center gap-2 mb-8">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-emerald"
                style={{
                  animation: `bounce 1.4s infinite`,
                  animationDelay: `${i * 0.2}s`,
                }}
              ></div>
            ))}
          </div>

          {/* Tips */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 text-left">
            <p className="text-xs text-gray-700 dark:text-gray-300">
              <span className="font-semibold text-blue-600 dark:text-blue-400">💡 Tip:</span> Our AI is analyzing your business details and creating a comprehensive, professional proposal tailored to your needs.
            </p>
          </div>
        </div>

        {/* Floating elements for visual interest */}
        <style>{`
          @keyframes bounce {
            0%, 80%, 100% {
              transform: translateY(0);
              opacity: 1;
            }
            40% {
              transform: translateY(-10px);
              opacity: 0.7;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-20px);
            }
          }
        `}</style>
      </div>
    </div>
  )
}
