'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { Input } from './ui/input';

export function Footer() {
  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Bouton Revenir en haut (Style Amazon) */}
      <div 
        className="bg-gray-700 dark:bg-gray-900 hover:bg-gray-600 dark:hover:bg-gray-800 transition-colors cursor-pointer text-center py-3 text-sm text-white font-semibold"
        onClick={handleBackToTop}
      >
        Retour en haut de page
      </div>

      {/* 2. Pied de page principal (Fond foncé, colonnes détaillées) */}
      <footer className="bg-gray-800 dark:bg-gray-900 border-t border-gray-700 mt-0 text-white">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
            
            {/* Colonne 1 : À propos de LibreShop */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-200">À propos de LibreShop</h3>
              <ul className="space-y-2">
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/carrieres">Carrières</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/contact">Nous contacter</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/presse">Espace Presse</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/faq">FAQ</Link></li>
              </ul>
            </div>
            
         
            
            {/* Colonne 3 : Aide et Paiement */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-200">Aide & Paiement</h3>
              <ul className="space-y-2">
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/compte">Votre Compte</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/livraison">Tarifs & Options de livraison</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/retours">Retours et Remplacements</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/service-client">Service Client</Link></li>
              </ul>
            </div>
            
            {/* Colonne 4 : Légal */}
            <div>
              <h3 className="font-bold text-lg mb-4 text-gray-200">Légal</h3>
              <ul className="space-y-2">
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/cgv">Conditions Générales de Vente</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/confidentialite">Politique de Confidentialité</Link></li>
                <li><Link className="text-sm text-gray-400 hover:text-white transition-colors" href="/cookies">Gestion des Cookies</Link></li>
              </ul>
            </div>

            {/* Colonne 5 : Newsletter (Conservé) */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-1">
              <h3 className="font-bold text-lg mb-4 text-gray-200">Restez Informé</h3>
              <p className="text-sm text-gray-400 mb-3">Inscrivez-vous à notre newsletter pour les offres exclusives.</p>
              <form className="flex">
                <Input 
                  className="form-input w-full rounded-l-lg border-gray-600 dark:border-gray-700 bg-gray-700 dark:bg-gray-800 text-white focus:ring-primary focus:border-primary" 
                  placeholder="Votre email" 
                  type="email" 
                />
                <Button 
                  className="bg-primary text-gray-900 px-4 rounded-r-lg hover:bg-primary/90 font-bold transition-colors" 
                  type="submit"
                >
                  S'inscrire
                </Button>
              </form>
              <div className="flex space-x-4 mt-6">
                <a className="text-gray-400 hover:text-white transition-colors text-2xl" href="#" aria-label="Facebook">FB</a>
                <a className="text-gray-400 hover:text-white transition-colors text-2xl" href="#" aria-label="Instagram">IG</a>
                <a className="text-gray-400 hover:text-white transition-colors text-2xl" href="#" aria-label="Twitter">TW</a>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center gap-6 border-t border-gray-700 mt-10 pt-6">
            <p className="text-xs text-gray-400">
              © 2024 LibreShop.fr - Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}