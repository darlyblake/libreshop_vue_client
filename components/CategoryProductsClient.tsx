"use client"

import React, { useMemo, useState } from "react"
import Link from "next/link"
import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Skeleton } from "./ui/skeleton"
import { Star } from "lucide-react"
import { useCart } from "@/app/providers/CartProvider"
import { ProductModal } from "./ProductModal"

import { Produit } from "@/app/models/Produit";

type LocalProduit = {
  id: string
  nom: string
  prix: number
  note: number
  image?: string
}

export default function CategoryProductsClient({
  initialProducts,
  categoryName,
}: {
  initialProducts: LocalProduit[]
  categoryName: string
}) {
  const { addToCart, isLoading } = useCart();
  const perPage = 12
  const [visibleCount, setVisibleCount] = useState(perPage)
  const [query, setQuery] = useState("")
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const filtered = useMemo(() => {
    if (!query) return initialProducts
    const q = query.toLowerCase()
    return initialProducts.filter((p) => p.nom.toLowerCase().includes(q))
  }, [initialProducts, query])

  const visible = filtered.slice(0, visibleCount)

  if (initialProducts.length === 0) {
    return (
      <section>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3 w-full md:w-1/2">
            <input
              aria-label="Rechercher dans la catégorie"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Rechercher dans ${categoryName}...`}
              className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary/30"
            />
            <span className="text-sm text-gray-500 hidden md:inline">0 résultats</span>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/produits">
              <Button variant="ghost" className="hidden sm:inline-flex">Voir tous les produits</Button>
            </Link>
            <Link href="/nouveautes">
              <Button variant="outline" className="hidden sm:inline-flex">Nouveautés</Button>
            </Link>
          </div>
        </div>

        {/* Message de page vide */}
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="max-w-md">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Aucun produit trouvé
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Cette catégorie ne contient actuellement aucun produit. Découvrez nos autres catégories !
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/categories">
                <Button className="px-6 py-3">
                  Voir toutes les catégories
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="px-6 py-3">
                  Retour à l'accueil
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 w-full md:w-1/2">
          <input
            aria-label="Rechercher dans la catégorie"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Rechercher dans ${categoryName}...`}
            className="w-full md:w-80 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-primary/30"
          />
          <span className="text-sm text-gray-500 hidden md:inline">{filtered.length} résultats</span>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/produits">
            <Button variant="ghost" className="hidden sm:inline-flex">Voir tous les produits</Button>
          </Link>
          <Link href="/nouveautes">
            <Button variant="outline" className="hidden sm:inline-flex">Nouveautés</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
        {visible.map((produit) => (
          <article key={produit.id} className="group">
            <ProductModal
              product={produit}
              trigger={
                <div className="cursor-pointer">
                  <Link
                    href={`/produit/${produit.id}`}
                    className="block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-lg"
                    aria-label={`Voir les détails du produit ${produit.nom}`}
                  >
                    <Card className="overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
                      <div className="relative">
                        <img
                          src={produit.image}
                          alt={`Image du produit ${produit.nom}`}
                          className="w-full h-44 object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 bg-white/90 text-xs px-2 py-1 rounded-md font-semibold">{produit.note}★</span>
                      </div>
                      <div className="p-3 flex flex-col h-36">
                        <h3 className="text-sm font-semibold line-clamp-2 mb-2">{produit.nom}</h3>
                        <div className="mt-auto flex items-center justify-between gap-3">
                          <div>
                            <div className="text-lg font-bold text-primary">{(produit.prix * 655.96).toLocaleString('fr-FR')} XAF</div>
                            <div className="text-xs text-gray-500">Livraison en 24-48h</div>
                          </div>
                          <Button
                            className="px-3 py-2 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                            onClick={async (e) => {
                              e.preventDefault();
                              await addToCart(produit.id);
                            }}
                            disabled={isLoading}
                            aria-label={`Ajouter ${produit.nom} au panier`}
                          >
                            {isLoading ? (
                              <>
                                <Skeleton className="h-4 w-4 mr-2" />
                                Ajout...
                              </>
                            ) : (
                              'Ajouter'
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </div>
              }
            />
          </article>
        ))}
      </div>

      {/* Charges */}
      <div className="mt-6 flex justify-center">
        {visibleCount < filtered.length ? (
          <Button
            onClick={async () => {
              setIsLoadingMore(true);
              // Simuler un délai de chargement
              await new Promise(resolve => setTimeout(resolve, 500));
              setVisibleCount((v) => v + perPage);
              setIsLoadingMore(false);
            }}
            disabled={isLoadingMore}
            className="px-6 py-3 hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`Charger ${Math.min(perPage, filtered.length - visibleCount)} produits supplémentaires`}
          >
            {isLoadingMore ? (
              <>
                <Skeleton className="h-4 w-4 mr-2" />
                Chargement...
              </>
            ) : (
              'Charger plus'
            )}
          </Button>
        ) : (
          <div className="text-sm text-gray-500" role="status" aria-live="polite">
            Vous avez consulté tous les produits.
          </div>
        )}
      </div>
    </section>
  )
}
