"use client"

import { useVirtualScroll } from '@/hooks/useVirtualScroll'
import { ProductCard } from './ProductCard'
import { Produit } from '@/app/models/Produit'

interface VirtualizedProductListProps {
  products: Produit[]
  onAddToCart?: (productId: string) => void
  itemHeight?: number
  containerHeight?: number
  className?: string
}

export function VirtualizedProductList({
  products,
  onAddToCart,
  itemHeight = 320,
  containerHeight = 600,
  className = ""
}: VirtualizedProductListProps) {
  const {
    visibleItems,
    totalHeight,
    offsetY,
    containerRef,
    scrollToIndex
  } = useVirtualScroll({
    itemHeight,
    containerHeight,
    items: products,
    overscan: 3
  })

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="overflow-auto"
        style={{ height: containerHeight }}
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          <div
            style={{
              transform: `translateY(${offsetY}px)`,
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0
            }}
          >
            {visibleItems.map((product, index) => (
              <div
                key={product.id}
                style={{ height: itemHeight }}
                className="p-2"
              >
                <ProductCard
                  id={product.id}
                  name={product.nom}
                  price={product.prix}
                  oldPrice={product.oldPrice}
                  rating={product.note}
                  image={product.image}
                  discount={product.discount}
                  onAddToCart={onAddToCart}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
