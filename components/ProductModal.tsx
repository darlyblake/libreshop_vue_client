"use client"

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';
import { useCart } from '@/app/providers/CartProvider';
import { Skeleton } from './ui/skeleton';

interface ProductModalProps {
  product: {
    id: string;
    nom: string;
    description?: string;
    prix: number;
    note: number;
    image?: string;
    discount?: number;
  };
  trigger: React.ReactNode;
  children?: React.ReactNode;
}

export function ProductModal({ product, trigger, children }: ProductModalProps) {
  const { addToCart, isLoading } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const handleAddToCart = async () => {
    await addToCart(product.id);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.nom}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={`Image détaillée de ${product.nom}`}
              className="w-full h-64 md:h-80 object-cover rounded-lg"
              loading="lazy"
            />
            {product.discount && (
              <Badge className="absolute top-2 left-2 bg-red-500">
                -{product.discount}%
              </Badge>
            )}
          </div>

          {/* Détails */}
          <div className="space-y-4">
            {/* Prix */}
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-primary">
                {(product.prix * 655.96).toLocaleString('fr-FR')} XAF
              </span>
              {product.discount && (
                <span className="text-lg text-gray-500 line-through">
                  {((product.prix * (1 + product.discount / 100)) * 655.96).toLocaleString('fr-FR')} XAF
                </span>
              )}
            </div>

            {/* Note */}
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.note)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.note})</span>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Livraison */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                🚚 Livraison gratuite en 24-48h
              </p>
            </div>

            {/* Bouton ajouter au panier */}
            <Button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full py-3 text-lg font-semibold hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`Ajouter ${product.nom} au panier`}
            >
              {isLoading ? (
                <>
                  <Skeleton className="h-5 w-5 mr-2" />
                  Ajout au panier...
                </>
              ) : (
                'Ajouter au panier'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
