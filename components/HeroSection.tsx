"use client"

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [

    {
      id: 2,
      backgroundImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
      title: 'Ventes Flash du Jour',
      subtitle: 'Jusqu\'à -50% sur une sélection limitée !',
      buttonText: 'Voir les offres',
      buttonHref: '/produits?filter=promotions-flash',
      buttonClass: 'bg-red-500 text-white hover:bg-red-600'
    },
    {
      id: 3,
      backgroundImage: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop',
      title: 'Nouveautés Arrivées',
      subtitle: 'Découvrez les derniers produits tendance.',
      buttonText: 'Explorer',
      buttonHref: '/nouveautes',
      buttonClass: 'bg-blue-500 text-white hover:bg-blue-600'
    },
    {
      id: 4,
      backgroundImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop',
      title: 'Offres Spéciales',
      subtitle: 'Profitez de réductions exclusives sur nos meilleures ventes.',
      buttonText: 'Acheter maintenant',
      buttonHref: '/produits',
      buttonClass: 'bg-green-500 text-white hover:bg-green-600'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="@container">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="relative min-h-[50vh] max-h-[600px] rounded-xl overflow-hidden">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col gap-6 bg-cover bg-center bg-no-repeat items-center justify-center p-4 text-center transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.5)), url(${slide.backgroundImage})`
              }}
            >
              <div className="flex flex-col gap-4">
                <h1 className="text-white text-4xl font-black leading-tight tracking-tighter md:text-5xl lg:text-6xl">
                  {slide.title}
                </h1>
                <h2 className="text-white text-lg font-normal leading-normal md:text-xl">
                  {slide.subtitle}
                </h2>
              </div>
              <Link href={slide.buttonHref}>
                <Button className={`flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 text-base font-bold leading-normal tracking-[0.015em] transition-colors shadow-lg ${slide.buttonClass}`}>
                  <span className="truncate">{slide.buttonText}</span>
                </Button>
              </Link>
            </div>
          ))}

          {/* Navigation Dots */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Aller au slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
