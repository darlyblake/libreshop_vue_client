"use client"

// Page du panier
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { QuantityButton } from "@/components/ui/quantity-button"
import { useCart } from "@/app/providers/CartProvider"
import { updateCartItemQuantity, removeFromCart } from "@/app/services/orderService"
import { useEffect, useState } from "react"

export default function PagePanier() {
  const { cartItems, refreshCart } = useCart()
  const articlesParier = cartItems

  useEffect(() => {
    refreshCart()
  }, [refreshCart])

  const handleQuantityChange = async (articleId: string, newQuantity: number) => {
    try {
      if (newQuantity <= 0) {
        await removeFromCart(articleId);
      } else {
        await updateCartItemQuantity(articleId, newQuantity);
      }
      refreshCart();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la quantité:', error);
    }
  };

  const handleRemoveItem = async (articleId: string) => {
    try {
      await removeFromCart(articleId);
      refreshCart();
    } catch (error) {
      console.error('Erreur lors de la suppression du produit:', error);
    }
  };

  // Calcul des totaux
  const sousTotal = articlesParier.reduce((acc, article) => acc + article.prix * article.quantite, 0)
  const fraisLivraison = 5.00
  const total = sousTotal + fraisLivraison

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden">
      <Header />

      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">Mon Panier</h1>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white dark:bg-gray-900/50 rounded-xl shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold">Articles ({articlesParier.length})</h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {articlesParier.map((article) => (
                  <div key={article.id} className="flex items-center gap-4 px-4 py-4 justify-between">
                    <div className="flex items-center gap-4 w-full">
                      <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg h-20 w-20 flex-shrink-0" style={{ backgroundImage: `url("${article.image}")` }}></div>
                      <div className="flex flex-col justify-center flex-grow">
                        <p className="text-base font-medium leading-normal line-clamp-1 text-gray-900 dark:text-white">{article.nom}</p>
                        <p className="text-sm font-normal leading-normal line-clamp-2 text-gray-500 dark:text-gray-400">{article.description}</p>
                        <p className="text-base font-bold mt-1 text-gray-900 dark:text-white">{(article.prix * 655.96).toLocaleString('fr-FR')} XAF</p>
                      </div>
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-2">
                      <div className="flex items-center gap-2 text-gray-900 dark:text-white">
                        <QuantityButton
                          type="decrement"
                          onClick={() => handleQuantityChange(article.id, article.quantite - 1)}
                          aria-label={`Diminuer la quantité de ${article.nom}`}
                        />
                        <label className="sr-only" htmlFor={`quantity-${article.id}`}>Quantité</label>
                        <input
                          id={`quantity-${article.id}`}
                          className="text-base font-medium leading-normal w-8 p-0 text-center bg-transparent focus:outline-0 focus:ring-0 border-none"
                          type="number"
                          value={article.quantite}
                          title="Quantité du produit"
                          placeholder="Quantité"
                          readOnly
                        />
                        <QuantityButton
                          type="increment"
                          onClick={() => handleQuantityChange(article.id, article.quantite + 1)}
                          aria-label={`Augmenter la quantité de ${article.nom}`}
                        />
                      </div>
                      <button
                        className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                        onClick={() => handleRemoveItem(article.id)}
                        aria-label={`Retirer ${article.nom} du panier`}
                      >
                        <span className="material-symbols-outlined text-base" aria-hidden="true">delete</span>
                        Retirer
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-1 space-y-6 sticky top-24">
              <div className="bg-white dark:bg-gray-900/50 rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Résumé de la commande</h2>
                <div className="space-y-3">
                  <div className="flex justify-between gap-x-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Sous-total</p>
                    <p className="text-gray-900 dark:text-white text-sm font-medium">{(sousTotal * 655.96).toLocaleString('fr-FR')} XAF</p>
                  </div>
                  <div className="flex justify-between gap-x-4">
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Frais de livraison</p>
                    <p className="text-gray-900 dark:text-white text-sm font-medium">{(fraisLivraison * 655.96).toLocaleString('fr-FR')} XAF</p>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
                  <div className="flex justify-between gap-x-4">
                    <p className="text-gray-900 dark:text-white text-base font-bold">Total</p>
                    <p className="text-gray-900 dark:text-white text-base font-bold">{(total * 655.96).toLocaleString('fr-FR')} XAF</p>
                  </div>
                </div>
              </div>
              <div className="bg-primary/10 dark:bg-primary/20 rounded-xl p-4 text-center">
                <p className="text-sm font-medium text-primary dark:text-primary/90">
                  <span className="font-bold">Estimation du temps de retrait :</span> 15-20 minutes
                </p>
              </div>
              <Link href="/checkout">
                <button
                  className="w-full flex items-center justify-center gap-2 rounded-lg bg-primary h-12 px-6 text-white text-base font-bold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Finaliser la commande et générer le QR code"
                >
                  Finaliser la commande (Générer QR Code)
                  <span className="material-symbols-outlined" aria-hidden="true">qr_code_2</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
