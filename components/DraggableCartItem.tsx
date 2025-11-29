"use client"

import { useState, useRef } from 'react'
import { useDragDrop } from '@/hooks/useDragDrop'
import { useMicroInteractions } from '@/hooks/useMicroInteractions'
import { CartItem } from '@/app/services/orderService'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { GripVertical, Trash2, Minus, Plus } from 'lucide-react'

interface DraggableCartItemProps {
  item: CartItem
  index: number
  onQuantityChange: (id: string, quantity: number) => void
  onRemove: (id: string) => void
  onReorder: (fromIndex: number, toIndex: number) => void
  isDragging?: boolean
  dragOverIndex?: number | null
}

export function DraggableCartItem({
  item,
  index,
  onQuantityChange,
  onRemove,
  onReorder,
  isDragging = false,
  dragOverIndex = null
}: DraggableCartItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { triggerSuccess, triggerError, triggerPulse } = useMicroInteractions()
  const dragHandleRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const quantityRef = useRef<HTMLDivElement>(null)

  const {
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    handleDrop
  } = useDragDrop({
    onReorder: (items, fromIndex, toIndex) => {
      onReorder(fromIndex, toIndex)
    },
    onDragStart: () => {
      if (dragHandleRef.current) {
        triggerPulse(dragHandleRef.current, { scale: 1.1 })
      }
    },
    onDragEnd: () => {
      if (dragHandleRef.current) {
        triggerSuccess(dragHandleRef.current, { scale: 1.05 })
      }
    }
  })

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      if (quantityRef.current) {
        triggerError(quantityRef.current, { duration: 300 })
      }
      setTimeout(() => onRemove(item.id), 300)
    } else {
      onQuantityChange(item.id, newQuantity)
      if (quantityRef.current) {
        triggerSuccess(quantityRef.current, { scale: 1.1 })
      }
    }
  }

  const handleRemove = () => {
    if (cardRef.current) {
      triggerError(cardRef.current, { duration: 400 })
    }
    setTimeout(() => onRemove(item.id), 400)
  }

  return (
    <Card
      ref={cardRef}
      className={`
        relative transition-all duration-200 cursor-move
        ${isDragging ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}
        ${dragOverIndex === index ? 'ring-2 ring-primary ring-offset-2' : ''}
        ${isHovered ? 'shadow-lg' : 'shadow-sm'}
      `}
      draggable
      onDragStart={(e) => handleDragStart(e, { ...item, index })}
      onDragOver={(e) => handleDragOver(e, index)}
      onDragEnd={handleDragEnd}
      onDrop={(e) => handleDrop(e, index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-4 p-4">
        {/* Drag Handle */}
        <div
          ref={dragHandleRef}
          className="cursor-grab active:cursor-grabbing p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <GripVertical className="h-5 w-5 text-gray-400" />
        </div>

        {/* Product Image */}
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-16 w-16 flex-shrink-0" style={{ backgroundImage: `url("${item.image}")` }}></div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">{item.nom}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.description}</p>
          <p className="text-lg font-bold text-primary">
            {(item.prix * 655.96).toLocaleString('fr-FR')} XAF
          </p>
        </div>

        {/* Quantity Controls */}
        <div ref={quantityRef} className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item.quantite - 1)}
            disabled={item.quantite <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-8 text-center font-medium">{item.quantite}</span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuantityChange(item.quantite + 1)}
            disabled={item.quantite >= 99}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Drag Overlay */}
      {isDragging && (
        <div className="absolute inset-0 bg-primary/10 border-2 border-dashed border-primary rounded-lg pointer-events-none" />
      )}
    </Card>
  )
}
