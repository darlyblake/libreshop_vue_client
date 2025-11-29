"use client"

import { useState, useRef, useEffect } from 'react'
import { useProgressiveEnhancement } from '@/hooks/useProgressiveEnhancement'
import { useMicroInteractions } from '@/hooks/useMicroInteractions'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Badge } from './ui/badge'
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react'
import { ImageWithLazyLoading } from './ImageWithLazyLoading'

interface EnhancedProductCardProps {
  id: string
  name: string
  price: number
  oldPrice?: number
  rating: number
  image: string
  discount?: number
  onAddToCart?: (productId: string) => void
  onViewDetails?: (productId: string) => void
  onToggleFavorite?: (productId: string) => void
  isFavorite?: boolean
}

export function EnhancedProductCard({
  id,
  name,
  price,
  oldPrice,
  rating,
  image,
  discount,
  onAddToCart,
  onViewDetails,
  onToggleFavorite,
  isFavorite = false
}: EnhancedProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const { features, isEnhanced, enhance } = useProgressiveEnhancement()
  const {
    triggerSuccess,
    triggerError,
    triggerPulse,
    triggerGlow,
    triggerRipple
  } = useMicroInteractions()

  // Progressive enhancement: utiliser les animations seulement si supportées
  useEffect(() => {
    if (isEnhanced && features.webAnimations) {
      // Animations avancées disponibles
    }
  }, [isEnhanced, features])

  const handleAddToCart = (e: React.MouseEvent) => {
    if (onAddToCart) {
      // Effet ripple sur le bouton
      const button = e.currentTarget as HTMLElement
      const rect = button.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      triggerRipple(button, x, y)

      // Animation de succès
      setTimeout(() => {
        triggerSuccess(button)
        onAddToCart(id)
      }, 300)
    }
  }

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      const heartIcon = cardRef.current?.querySelector('.heart-icon') as HTMLElement
      if (heartIcon) {
        if (isFavorite) {
          triggerError(heartIcon)
        } else {
          triggerSuccess(heartIcon, { scale: 1.3 })
        }
      }
      onToggleFavorite(id)
    }
  }

  const handleViewDetails = () => {
    if (onViewDetails) {
      if (cardRef.current) {
        triggerPulse(cardRef.current, { scale: 1.02 })
      }
      onViewDetails(id)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (features.webAnimations && cardRef.current) {
      triggerGlow(cardRef.current, { duration: 300 })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <Card
      ref={cardRef}
      className={`
        group relative overflow-hidden transition-all duration-300 cursor-pointer
        ${isHovered ? 'shadow-xl scale-105' : 'shadow-md scale-100'}
        ${isEnhanced ? 'transform-gpu' : ''}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleViewDetails}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-10 flex gap-1">
        {discount && (
          <Badge variant="destructive" className="text-xs">
            -{discount}%
          </Badge>
        )}
        {rating >= 4.5 && (
          <Badge variant="secondary" className="text-xs">
            Top
          </Badge>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleToggleFavorite()
        }}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
        title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
        aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
      >
        <Heart
          className={`heart-icon h-4 w-4 transition-colors ${
            isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
          }`}
        />
      </button>

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <ImageWithLazyLoading
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay on hover */}
        <div className={`
          absolute inset-0 bg-black/40 flex items-center justify-center gap-2
          transition-opacity duration-300
          ${isHovered ? 'opacity-100' : 'opacity-0'}
        `}>
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation()
              handleViewDetails()
            }}
            className="gap-1"
          >
            <Eye className="h-4 w-4" />
            Voir
          </Button>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="gap-1"
          >
            <ShoppingCart className="h-4 w-4" />
            Ajouter
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({rating.toFixed(1)})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-lg text-primary">
            {(price * 655.96).toLocaleString('fr-FR')} XAF
          </span>
          {oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              {(oldPrice * 655.96).toLocaleString('fr-FR')} XAF
            </span>
          )}
        </div>
      </div>

      {/* Progressive enhancement: effets visuels avancés */}
      {enhance('webAnimations', () => {
        // Animations CSS avancées disponibles
      }, () => {
        // Fallback pour navigateurs plus anciens
      })}
    </Card>
  )
}
