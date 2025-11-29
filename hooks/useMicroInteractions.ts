"use client"

import { useCallback, useRef } from 'react'

interface MicroInteractionOptions {
  duration?: number
  easing?: string
  scale?: number
  rotate?: number
  translateX?: number
  translateY?: number
}

interface UseMicroInteractionsResult {
  triggerSuccess: (element: HTMLElement, options?: MicroInteractionOptions) => void
  triggerError: (element: HTMLElement, options?: MicroInteractionOptions) => void
  triggerLoading: (element: HTMLElement, options?: MicroInteractionOptions) => void
  triggerPulse: (element: HTMLElement, options?: MicroInteractionOptions) => void
  triggerShake: (element: HTMLElement, options?: MicroInteractionOptions) => void
  triggerBounce: (element: HTMLElement, options?: MicroInteractionOptions) => void
  triggerGlow: (element: HTMLElement, options?: MicroInteractionOptions) => void
  triggerRipple: (element: HTMLElement, x: number, y: number, options?: MicroInteractionOptions) => void
}

export function useMicroInteractions(): UseMicroInteractionsResult {
  const animationTimeouts = useRef<Map<string, NodeJS.Timeout>>(new Map())

  const clearExistingAnimations = useCallback((element: HTMLElement) => {
    const elementId = element.id || element.className || Math.random().toString()
    const existingTimeout = animationTimeouts.current.get(elementId)
    if (existingTimeout) {
      clearTimeout(existingTimeout)
      animationTimeouts.current.delete(elementId)
    }

    // Supprimer les classes d'animation existantes
    element.classList.remove(
      'animate-pulse',
      'animate-bounce',
      'animate-shake',
      'animate-glow',
      'animate-success',
      'animate-error',
      'animate-loading'
    )
  }, [])

  const triggerAnimation = useCallback((
    element: HTMLElement,
    animationClass: string,
    options: MicroInteractionOptions = {},
    cleanupDelay: number = 1000
  ) => {
    clearExistingAnimations(element)

    const elementId = element.id || element.className || Math.random().toString()

    // Appliquer l'animation
    element.classList.add(animationClass)

    // Nettoyer après la durée spécifiée
    const timeout = setTimeout(() => {
      element.classList.remove(animationClass)
      animationTimeouts.current.delete(elementId)
    }, cleanupDelay)

    animationTimeouts.current.set(elementId, timeout)
  }, [clearExistingAnimations])

  const triggerSuccess = useCallback((element: HTMLElement, options: MicroInteractionOptions = {}) => {
    const keyframes = [
      { transform: 'scale(1)', backgroundColor: 'currentColor' },
      { transform: `scale(${options.scale || 1.1})`, backgroundColor: '#10b981' },
      { transform: 'scale(1)', backgroundColor: 'currentColor' }
    ]

    const animation = element.animate(keyframes, {
      duration: options.duration || 600,
      easing: options.easing || 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      fill: 'forwards'
    })

    animation.addEventListener('finish', () => {
      element.style.transform = ''
      element.style.backgroundColor = ''
    })
  }, [])

  const triggerError = useCallback((element: HTMLElement, options: MicroInteractionOptions = {}) => {
    const keyframes = [
      { transform: 'translateX(0)', backgroundColor: 'currentColor' },
      { transform: 'translateX(-10px)', backgroundColor: '#ef4444' },
      { transform: 'translateX(10px)', backgroundColor: '#ef4444' },
      { transform: 'translateX(-10px)', backgroundColor: '#ef4444' },
      { transform: 'translateX(10px)', backgroundColor: '#ef4444' },
      { transform: 'translateX(0)', backgroundColor: 'currentColor' }
    ]

    const animation = element.animate(keyframes, {
      duration: options.duration || 500,
      easing: options.easing || 'ease-in-out',
      fill: 'forwards'
    })

    animation.addEventListener('finish', () => {
      element.style.transform = ''
      element.style.backgroundColor = ''
    })
  }, [])

  const triggerLoading = useCallback((element: HTMLElement, options: MicroInteractionOptions = {}) => {
    triggerAnimation(element, 'animate-pulse', options, 2000)
  }, [triggerAnimation])

  const triggerPulse = useCallback((element: HTMLElement, options: MicroInteractionOptions = {}) => {
    const keyframes = [
      { transform: 'scale(1)', opacity: '1' },
      { transform: `scale(${options.scale || 1.05})`, opacity: '0.7' },
      { transform: 'scale(1)', opacity: '1' }
    ]

    const animation = element.animate(keyframes, {
      duration: options.duration || 400,
      easing: options.easing || 'ease-in-out',
      fill: 'forwards'
    })

    animation.addEventListener('finish', () => {
      element.style.transform = ''
      element.style.opacity = ''
    })
  }, [])

  const triggerShake = useCallback((element: HTMLElement, options: MicroInteractionOptions = {}) => {
    const keyframes = [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(-5px)' },
      { transform: 'translateX(5px)' },
      { transform: 'translateX(0)' }
    ]

    const animation = element.animate(keyframes, {
      duration: options.duration || 400,
      easing: options.easing || 'ease-in-out',
      fill: 'forwards'
    })

    animation.addEventListener('finish', () => {
      element.style.transform = ''
    })
  }, [])

  const triggerBounce = useCallback((element: HTMLElement, options: MicroInteractionOptions = {}) => {
    const keyframes = [
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-10px) scale(1.1)' },
      { transform: 'translateY(0) scale(1)' },
      { transform: 'translateY(-5px) scale(1.05)' },
      { transform: 'translateY(0) scale(1)' }
    ]

    const animation = element.animate(keyframes, {
      duration: options.duration || 600,
      easing: options.easing || 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      fill: 'forwards'
    })

    animation.addEventListener('finish', () => {
      element.style.transform = ''
    })
  }, [])

  const triggerGlow = useCallback((element: HTMLElement, options: MicroInteractionOptions = {}) => {
    const keyframes = [
      { boxShadow: '0 0 0 0 rgba(59, 130, 246, 0.7)' },
      { boxShadow: '0 0 0 10px rgba(59, 130, 246, 0)' }
    ]

    const animation = element.animate(keyframes, {
      duration: options.duration || 800,
      easing: options.easing || 'ease-out',
      fill: 'forwards'
    })

    animation.addEventListener('finish', () => {
      element.style.boxShadow = ''
    })
  }, [])

  const triggerRipple = useCallback((element: HTMLElement, x: number, y: number, options: MicroInteractionOptions = {}) => {
    const ripple = document.createElement('span')
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const radius = size / 2

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      left: ${x - radius}px;
      top: ${y - radius}px;
      width: ${size}px;
      height: ${size}px;
      pointer-events: none;
      z-index: 10;
    `

    element.style.position = element.style.position || 'relative'
    element.style.overflow = 'hidden'
    element.appendChild(ripple)

    const keyframes = `
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `

    const style = document.createElement('style')
    style.textContent = keyframes
    document.head.appendChild(style)

    setTimeout(() => {
      ripple.remove()
      style.remove()
    }, 600)
  }, [])

  return {
    triggerSuccess,
    triggerError,
    triggerLoading,
    triggerPulse,
    triggerShake,
    triggerBounce,
    triggerGlow,
    triggerRipple
  }
}
