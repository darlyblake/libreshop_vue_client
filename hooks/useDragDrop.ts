"use client"

import { useState, useCallback, useRef } from 'react'

interface DragItem {
  id: string
  index: number
  [key: string]: any
}

interface UseDragDropOptions {
  onReorder?: (items: any[], fromIndex: number, toIndex: number) => void
  onDragStart?: (item: DragItem) => void
  onDragEnd?: (item: DragItem) => void
}

interface UseDragDropResult {
  draggedItem: DragItem | null
  dragOverIndex: number | null
  handleDragStart: (e: React.DragEvent, item: DragItem) => void
  handleDragOver: (e: React.DragEvent, index: number) => void
  handleDragEnd: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent, dropIndex: number) => void
  isDragging: boolean
}

export function useDragDrop({
  onReorder,
  onDragStart,
  onDragEnd
}: UseDragDropOptions = {}): UseDragDropResult {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const dragOffsetRef = useRef({ x: 0, y: 0 })

  const handleDragStart = useCallback((e: React.DragEvent, item: DragItem) => {
    setDraggedItem(item)
    dragOffsetRef.current = {
      x: e.clientX - e.currentTarget.getBoundingClientRect().left,
      y: e.clientY - e.currentTarget.getBoundingClientRect().top
    }

    // Créer une image de drag personnalisée
    const dragImage = e.currentTarget.cloneNode(true) as HTMLElement
    dragImage.style.opacity = '0.5'
    dragImage.style.transform = 'rotate(5deg)'
    dragImage.style.position = 'absolute'
    dragImage.style.top = '-1000px'
    document.body.appendChild(dragImage)
    e.dataTransfer.setDragImage(dragImage, dragOffsetRef.current.x, dragOffsetRef.current.y)
    setTimeout(() => document.body.removeChild(dragImage), 0)

    e.dataTransfer.effectAllowed = 'move'
    onDragStart?.(item)
  }, [onDragStart])

  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverIndex(index)
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    setDraggedItem(null)
    setDragOverIndex(null)
    onDragEnd?.(draggedItem!)
  }, [draggedItem, onDragEnd])

  const handleDrop = useCallback((e: React.DragEvent, dropIndex: number) => {
    e.preventDefault()

    if (!draggedItem || draggedItem.index === dropIndex) {
      setDraggedItem(null)
      setDragOverIndex(null)
      return
    }

    onReorder?.([], draggedItem.index, dropIndex)
    setDraggedItem(null)
    setDragOverIndex(null)
  }, [draggedItem, onReorder])

  return {
    draggedItem,
    dragOverIndex,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop,
    isDragging: draggedItem !== null
  }
}
