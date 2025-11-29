'use client';

import Link from 'next/link';
import { Rating } from './ui/rating';
import { ImageWithLazyLoading } from './ImageWithLazyLoading';

interface ShopCardProps {
  id: string;
  nom: string;
  description: string;
  note: number;
  image: string;
}

export function ShopCard({
  id,
  nom,
  description,
  note,
  image,
}: ShopCardProps) {
  return (
    <Link
      href={`/boutique/${id}`}
      className="flex flex-col group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
      aria-label={`Voir les détails de la boutique ${nom}`}
    >
      <div className="relative w-full aspect-[4/5] rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <ImageWithLazyLoading
          src={image}
          alt={`Image de la boutique ${nom}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
          <p className="text-white text-center p-4">{description}</p>
        </div>
      </div>
      <div className="pt-2 sm:pt-3">
        <p className='text-xs sm:text-base font-semibold leading-tight sm:leading-normal truncate'>
          {nom}
        </p>
        <div className="mt-1">
          <Rating value={note} size='base' showScore />
        </div>
      </div>
    </Link>
  );
}