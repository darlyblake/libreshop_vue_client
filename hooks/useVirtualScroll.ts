"use client"

import { useState, useEffect, useCallback, useRef } from 'react'

interface VirtualScrollOptions {
  itemHeight: number
  containerHeight: number
  items: any[]
  overscan?: number
}

interface VirtualScrollResult {
  visibleItems: any[]
  startIndex: number
  endIndex: number
  totalHeight: number
  offsetY: number
  containerRef: React.RefObject<HTMLDivElement | null>
  scrollToIndex: (index: number) => void
}

export function useVirtualScroll({
  itemHeight,
  containerHeight,
  items,
  overscan = 5
}: VirtualScrollOptions): VirtualScrollResult {
  const [scrollTop, setScrollTop] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  )

  const visibleItems = items.slice(startIndex, endIndex + 1)
  const totalHeight = items.length * itemHeight
  const offsetY = startIndex * itemHeight

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLElement
    setScrollTop(target.scrollTop)
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true })
      return () => container.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  const scrollToIndex = useCallback((index: number) => {
    const container = containerRef.current
    if (container) {
      const scrollTop = index * itemHeight
      container.scrollTo({ top: scrollTop, behavior: 'smooth' })
      setScrollTop(scrollTop)
    }
  }, [itemHeight])

  return {
    visibleItems,
    startIndex,
    endIndex,
    totalHeight,
    offsetY,
    containerRef,
    scrollToIndex
  }
}
