"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { ShoppingCart, User, Menu, Search, ChevronDown, Settings } from 'lucide-react';
import { useCart } from '@/app/providers/CartProvider';
import { PreferencesModal } from './PreferencesModal';

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cartItemCount } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    // fermer les menus lors du changement de route
    setOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  // Fonction pour gérer le clic sur l'icône de recherche mobile
  const handleMobileSearchClick = () => {
    if (!searchOpen) {
      setOpen(false); 
    }
    setSearchOpen((v) => !v);
  };


  return (
    <header className="sticky top-0 z-50">
      
      {/* 1. Barre de navigation principale (Clair et Centré) */}
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg shadow-md border-b border-gray-100 dark:border-gray-800 h-[72px] flex items-center px-4 md:px-6">
        <div className="container mx-auto flex items-center justify-between gap-6">
          
          {/* Logo (Gauche) */}
          <Link
            href="/"
            className="flex items-end gap-1 text-gray-900 dark:text-white min-w-[120px] transition-all duration-200 hover:opacity-80 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
            aria-label="LibreShop - Accueil"
          >
            <span className="text-3xl font-black italic text-primary">Libre</span>
            <span className="text-xl font-bold -translate-y-px">Shop</span>
          </Link>
          
          {/* Barre de Recherche (Centre - visible UNIQUEMENT sur écrans LARGES) */}
          <div className="flex-1 max-w-[700px] hidden sm:flex">
            <div className="relative flex w-full">
              <select
                className="hidden md:block bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm border border-gray-300 dark:border-gray-700 rounded-l-lg pl-3 pr-8 focus:ring-primary focus:outline-none hover:bg-gray-200 transition-colors"
                aria-label="Filtrer par catégorie"
                title="Sélectionner une catégorie"
              >
                <option>Toutes</option>
                <option>High-Tech</option>
                <option>Mode</option>
                <option>Maison</option>
              </select>
              <Input 
                className="w-full h-10 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border-y border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 text-sm md:rounded-l-none" 
                placeholder="Rechercher un produit, une marque..." />
              <Button 
                className="bg-primary hover:bg-primary/90 text-white dark:text-gray-900 h-10 w-12 rounded-r-lg p-0 flex items-center justify-center transition-colors"
                aria-label="Rechercher"
              >
                <Search className="h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Liens de compte et Panier (Droite) */}
          <div className="flex items-center gap-2 md:gap-4 text-sm min-w-[120px] justify-end">
            
            {/* ICÔNE DE RECHERCHE MOBILE (Visible sur petit écran) */}
            <button
              aria-label="Recherche rapide"
              onClick={handleMobileSearchClick}
              className="sm:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
            >
              <Search className="h-6 w-6" />
            </button>
            
            {/* Mon Compte (Desktop) */}
            <div className="hidden lg:flex flex-col text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer p-1">
              <span className="text-xs leading-none">Bonjour,</span>
              <span className="font-bold flex items-center leading-none">
                Mon Compte <ChevronDown className="h-3 w-3 ml-1" />
              </span>
            </div>

            {/* VOS COMMANDES (Ajouté pour le Desktop) */}
            <Link href="/commandes" className="hidden lg:flex flex-col text-gray-700 dark:text-gray-300 hover:text-primary transition-colors cursor-pointer p-1">
              <span className="text-xs leading-none">Vos</span>
              <span className="font-bold leading-none">Commandes</span>
            </Link>

            {/* PRÉFÉRENCES */}
            <div className="hidden lg:flex">
              <PreferencesModal />
            </div>

            {/* Panier */}
            <Link
              href="/panier"
              className="relative flex items-center p-1 text-gray-700 dark:text-gray-300 hover:text-primary transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded cursor-pointer"
              aria-label={`Panier (${cartItemCount} article${cartItemCount > 1 ? 's' : ''})`}
            >
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              <span className="absolute top-0 right-0 md:right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-xs font-bold transition-transform hover:scale-110">
                {cartItemCount > 0 ? cartItemCount : 0}
              </span>
              <span className="hidden md:block font-bold ml-2">Panier</span>
            </Link>
            
            {/* Bouton Menu Hamburger (visible en mobile seulement) */}
            <button
              aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={open ? "true" : "false"}
              aria-controls="mobile-menu"
              onClick={() => { setOpen((v) => !v); setSearchOpen(false); }}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Barre de recherche MOBILE EN PLEINE LARGEUR */}
      <div 
          className={`sm:hidden bg-gray-50 dark:bg-gray-800 px-4 py-3 border-b border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ${searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
      >
          <div className="relative flex w-full">
              <Input 
                  className="w-full h-10 px-4 py-2 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-primary/50 text-sm rounded-l-lg" 
                  placeholder="Rechercher sur LibreShop..." />
              <Button 
                  className="bg-primary hover:bg-primary/90 text-white dark:text-gray-900 h-10 w-12 rounded-r-lg p-0 flex items-center justify-center transition-colors"
                  aria-label="Rechercher"
              >
                  <Search className="h-5 w-5" />
              </Button>
          </div>
      </div>


      {/* 2. Barre de navigation secondaire (Bandeau de Liens rapides - Desktop uniquement) */}
      <div className="bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 h-10 hidden md:flex items-center px-6 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="container mx-auto flex items-center gap-6 text-sm font-semibold">
          
          {/* Menu principal (Catégories) */}
          <Link href="/categories" className="flex items-center gap-1 p-1 text-primary hover:text-primary/80 transition-colors">
            <Menu className="h-5 w-5 mr-1" />
            <span>Toutes nos catégories</span>
          </Link>
          
          {/* Liens Rapides */}
          <Link href="/nouveautes" className="p-1 hover:text-primary transition-colors">
            Nouveautés
          </Link>
          <Link href="/produits?filter=meilleures-ventes" className="p-1 hover:text-primary transition-colors">
            Meilleures Ventes
          </Link>
          <Link href="/boutiques" className="p-1 hover:text-primary transition-colors">
            Boutiques
          </Link>
          <Link href="/boutiques?filter=tendances" className="p-1 hover:text-primary transition-colors">
            Boutiques Tendance
          </Link>
          <Link href="/service-client" className="p-1 hover:text-primary transition-colors">
            Service Client
          </Link>
        </div>
      </div>

      {/* 3. Menu mobile (Déplié) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-75 md:hidden transition-all duration-300 z-40 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation mobile"
        onClick={() => setOpen(false)}
      >
        <div
          id="mobile-menu"
          className={`h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 transform transition-all duration-300 ease-in-out shadow-2xl ${open ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
          role="navigation"
          aria-label="Navigation principale"
        >
          <div className="flex items-center p-4 bg-primary text-white">
            <User className="h-6 w-6 mr-2" />
            <span className="text-lg font-bold">Bonjour Client</span>
          </div>
          <div className="p-4 space-y-4">
            <Link href="/categories" onClick={() => setOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Toutes les catégories</Link>
            <Link href="/nouveautes" onClick={() => setOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Nouveautés</Link>
            <Link href="/produits?filter=meilleures-ventes" onClick={() => setOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Meilleures Ventes</Link>
            <Link href="/boutiques" onClick={() => setOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Boutiques</Link>
            <Link href="/boutiques?filter=tendances" onClick={() => setOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Boutiques Tendance</Link>
            <Link href="/commandes" onClick={() => setOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Vos Commandes</Link>
            <Link href="/login" onClick={() => setOpen(false)} className="block text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary">Mon compte</Link>
          </div>
        </div>
      </div>
    </header>
  );
}