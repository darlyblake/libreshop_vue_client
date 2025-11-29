"use client"
import Image from 'next/image'
import Link from 'next/link'
import { Card } from './ui/card'
import { AddToCartButton } from './ui/add-to-cart-button'
import { NavigationArrow } from './ui/navigation-arrow'
import { PaginationDots } from './ui/pagination-dots'
import { Rating } from './ui/rating'
import { PromoBadge } from './ui/promo-badge'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { useState } from 'react'
import { useCart } from '@/app/providers/CartProvider'

type Product = {
  id: string
  name: string
  prix: number
  oldPrice?: number // oldPrice est correct
  discount?: number
  image: string
  isNew?: boolean
  isTrending?: boolean
  rating: number // Ajout de la notation
  reviewCount: number // Ajout du nombre d'avis
}

const PRODUCTS_PER_PAGE = 3

export function TrendingProducts({ products }: { products: Product[] }) {
  const { addToCart } = useCart()

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3">
            <Card className="transition-shadow hover:shadow-lg">
              <div className="relative h-48 overflow-hidden rounded-t-lg">
              <Link href={`/produit/${product.id}`} className="block h-full">
                <Image
                  src={product.image}
                  alt={`Image du produit ${product.name}`}
                  fill
                  className="object-cover transition-transform hover:scale-105 duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </Link>
              {product.discount && (
                <PromoBadge 
                  className="absolute top-2 left-2"
                  text={`-${product.discount}%`}
                  size="sm"
                />
              )}
            </div>
            <div className="p-4">
              <Link href={`/produit/${product.id}`} className="block">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                  {product.name}
                </h3>
              </Link>

              <div className="mb-2">
                <Rating value={product.rating} size="sm" showScore />
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-red-700 dark:text-red-400">
                  {(Number(product.prix) * 655.96).toLocaleString('fr-FR')} XAF
                </span>
                {product.oldPrice && (
                  <span className="text-sm line-through text-gray-500">
                    {(Number(product.oldPrice) * 655.96).toLocaleString('fr-FR')} XAF
                  </span>
                )}
              </div>

              <div className="mt-3 flex justify-between items-center">
                {/* Badges */}
                <div className="flex gap-2">
                  {product.isNew && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-full">
                      Nouveau
                    </span>
                  )}
                  {product.isTrending && (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-orange-700 bg-orange-100 rounded-full">
                      Tendance
                    </span>
                  )}
                </div>

                {/* Bouton Ajouter au Panier (rapide) */}
                <AddToCartButton
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await addToCart(product.id);
                    } catch (error) {
                      console.error('Erreur lors de l\'ajout au panier:', error);
                    }
                  }}
                />
                </div>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
