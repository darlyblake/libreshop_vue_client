'use client';

import Link from 'next/link';
import { Rating } from './ui/rating';
import { PromoBadge } from './ui/promo-badge';
import { AddToCartButton } from './ui/add-to-cart-button';
import { useToast } from './ui/use-toast';
import { ImageWithLazyLoading } from './ImageWithLazyLoading';
import { useCart } from '@/app/providers/CartProvider';
import { useState } from 'react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  image: string;
  discount?: number;
  isCompact?: boolean;
  onAddToCart?: (id: string) => void;
}

export function ProductCard({
  id,
  name,
  price,
  oldPrice,
  rating,
  image,
  discount,
  isCompact = false,
  onAddToCart
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await addToCart(id);
      toast({
        title: "Produit ajouté au panier",
        description: `${name} a été ajouté à votre panier.`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier.",
        variant: "destructive",
      });
    }
  };

  return (
    <Link
      href={`/produit/${id}`}
      className="flex flex-col group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      aria-label={`Voir les détails du produit ${name}`}
    >
      <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <ImageWithLazyLoading
          src={image}
          alt={`Image du produit ${name}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <AddToCartButton
            onClick={handleAddToCart}
            size={isCompact ? 'sm' : 'default'}
            className="bg-primary text-white hover:bg-primary/90 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label={`Ajouter ${name} au panier`}
          />
        </div>
        {discount && (
          <PromoBadge
            className="absolute top-2 left-2 animate-pulse"
            text={`-${discount}%`}
            size="sm"
          />
        )}
      </div>
      <div className="pt-2 sm:pt-3">
        <p className={`${isCompact ? 'text-xs' : 'text-xs sm:text-base'} font-semibold leading-tight sm:leading-normal truncate`}>
          {name}
        </p>
        <div className="flex flex-wrap items-baseline gap-2">
          {oldPrice ? (
            <>
              <span className="text-red-500 text-xs sm:text-sm font-medium">
                {(price * 655.96).toLocaleString('fr-FR')} XAF
              </span>
              <span className="text-text-light/60 dark:text-text-dark/60 text-xs line-through">
                {(oldPrice * 655.96).toLocaleString('fr-FR')} XAF
              </span>
            </>
          ) : (
            <span className="text-text-light/80 dark:text-text-dark/80 text-xs sm:text-sm font-normal">
              {(price * 655.96).toLocaleString('fr-FR')} XAF
            </span>
          )}
        </div>
        <div className="mt-1">
          <Rating value={rating} size={isCompact ? 'sm' : 'base'} showScore />
        </div>
      </div>
    </Link>
  );
}