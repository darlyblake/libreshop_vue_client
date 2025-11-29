"use client"

import { useState, useEffect, useCallback } from 'react'

interface ProgressiveFeature {
  name: string
  supported: boolean
  fallback?: () => void
  enhanced?: () => void
}

interface UseProgressiveEnhancementResult {
  features: Record<string, boolean>
  isEnhanced: boolean
  enhance: (featureName: string, enhancedFn: () => void, fallbackFn?: () => void) => void
}

export function useProgressiveEnhancement(): UseProgressiveEnhancementResult {
  const [features, setFeatures] = useState<Record<string, boolean>>({})
  const [isEnhanced, setIsEnhanced] = useState(false)

  // Détecter les capacités du navigateur
  const detectFeatures = useCallback(() => {
    const detectedFeatures: Record<string, boolean> = {
      // API modernes
      intersectionObserver: typeof IntersectionObserver !== 'undefined',
      webAnimations: typeof document !== 'undefined' && 'animate' in document.createElement('div'),
      webGL: typeof WebGLRenderingContext !== 'undefined',
      serviceWorker: 'serviceWorker' in navigator,
      webRTC: 'RTCPeerConnection' in window,
      webAssembly: typeof WebAssembly !== 'undefined',

      // APIs de stockage
      localStorage: typeof localStorage !== 'undefined',
      sessionStorage: typeof sessionStorage !== 'undefined',
      indexedDB: typeof indexedDB !== 'undefined',

      // APIs multimédia
      webAudio: typeof AudioContext !== 'undefined' || typeof (window as any).webkitAudioContext !== 'undefined',
      mediaDevices: 'mediaDevices' in navigator,
      getUserMedia: 'getUserMedia' in navigator.mediaDevices || 'webkitGetUserMedia' in navigator.mediaDevices,

      // APIs de performance
      performanceObserver: typeof PerformanceObserver !== 'undefined',
      requestIdleCallback: 'requestIdleCallback' in window,

      // APIs de réseau
      fetch: typeof fetch !== 'undefined',
      beacon: 'sendBeacon' in navigator,

      // APIs de géolocalisation
      geolocation: 'geolocation' in navigator,

      // APIs de capteurs
      deviceOrientation: 'DeviceOrientationEvent' in window,
      deviceMotion: 'DeviceMotionEvent' in window,

      // Support CSS
      cssGrid: typeof CSS !== 'undefined' && CSS.supports('display', 'grid'),
      cssCustomProperties: typeof CSS !== 'undefined' && CSS.supports('--custom-property', 'value'),
      cssAnimations: typeof CSS !== 'undefined' && CSS.supports('animation', 'name 1s'),

      // Touch et gestes
      touch: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
      pointerEvents: 'PointerEvent' in window,

      // Autres
      webSockets: typeof WebSocket !== 'undefined',
      webWorkers: typeof Worker !== 'undefined',
      notifications: 'Notification' in window,
      pushManager: 'PushManager' in window,
      paymentRequest: 'PaymentRequest' in window,
    }

    setFeatures(detectedFeatures)

    // Déterminer si le navigateur est "moderne"
    const essentialFeatures = [
      'intersectionObserver',
      'localStorage',
      'fetch',
      'cssGrid',
      'cssCustomProperties'
    ]

    const hasEssentialFeatures = essentialFeatures.every(feature => detectedFeatures[feature])
    setIsEnhanced(hasEssentialFeatures)

    return detectedFeatures
  }, [])

  const enhance = useCallback((featureName: string, enhancedFn: () => void, fallbackFn?: () => void) => {
    if (features[featureName]) {
      enhancedFn()
    } else if (fallbackFn) {
      fallbackFn()
    }
  }, [features])

  useEffect(() => {
    detectFeatures()
  }, [detectFeatures])

  return {
    features,
    isEnhanced,
    enhance
  }
}
