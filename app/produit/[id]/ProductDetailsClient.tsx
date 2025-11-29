"use client"
import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/Header"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Star, Share2, Heart } from "lucide-react"
import { PromoBadge } from "@/components/ui/promo-badge"
import { QuantityButton } from "@/components/ui/quantity-button"
import ImageWithSkeleton from '@/components/ImageWithSkeleton'
import { Produit } from "@/app/models/Produit"
import { useCart } from "@/app/providers/CartProvider"

interface ProductDetailsClientProps {
  product: Produit;
}

export default function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const router = useRouter()
  const productId = product.id; // Use product.id directly
  const { addToCart } = useCart()

  const images = [
    "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600&h=600&fit=crop",
  ]

  const [selected, setSelected] = useState(0)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeTab, setActiveTab] = useState('description')
  const [reviewRating, setReviewRating] = useState(5)
  const [reviewComment, setReviewComment] = useState('')
  const [reviews, setReviews] = useState([
    {
      id: 1,
      name: 'Jean Dupont',
      date: '15/10/2023',
      rating: 5,
      comment: 'Excellente montre ! Design élégant et fonctionnalités complètes. L\'autonomie est impressionnante.'
    },
    {
      id: 2,
      name: 'Marie Martin',
      date: '02/10/2023',
      rating: 4,
      comment: 'Très bonne montre connectée. Interface fluide et suivi sportif précis. Seul bémol : le prix un peu élevé.'
    },
    {
      id: 3,
      name: 'Pierre Durand',
      date: '28/09/2023',
      rating: 5,
      comment: 'Parfaite pour le sport et le quotidien. Notifications discrètes et écran toujours lisible.'
    }
  ])
  const touchStartX = useRef<number | null>(null)

  // No need for useEffect to fetch product, as it's passed as prop

  const handleAdd = async () => {
    try {
      await addToCart(productId, qty);
      setAdded(true)
      setTimeout(() => setAdded(false), 2200)
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  }

  const handleBuyNow = () => {
    const productData = {
      id: product?.id,
      name: product?.nom,
      price: product?.prix,
      quantity: qty,
      image: product?.image
    }
    localStorage.setItem('checkoutProduct', JSON.stringify(productData))
    router.push('/checkout')
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (reviewComment.trim()) {
      const newReview = {
        id: reviews.length + 1,
        name: 'Utilisateur Anonyme',
        date: new Date().toLocaleDateString('fr-FR'),
        rating: reviewRating,
        comment: reviewComment.trim()
      }
      setReviews([newReview, ...reviews])
      setReviewComment('')
      setReviewRating(5)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <section>
            <div className="rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
              <div
                className="relative h-[520px] bg-gray-100 dark:bg-gray-700"
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
                onTouchEnd={(e) => {
                  const endX = e.changedTouches[0].clientX
                  if (touchStartX.current == null) return
                  const delta = touchStartX.current - endX
                  if (Math.abs(delta) > 50) {
                    if (delta > 0) {
                      setSelected((s) => Math.min(images.length - 1, s + 1))
                    } else {
                      setSelected((s) => Math.max(0, s - 1))
                    }
                  }
                  touchStartX.current = null
                }}
              >
                <ImageWithSkeleton src={images[selected]} alt={`Product ${productId}`} fill className="transition-transform duration-700 hover:scale-105" />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button title="Partager" className="rounded-full bg-white/90 dark:bg-black/40 p-3 shadow-sm hover:scale-105 transition" aria-label="Partager">
                    <Share2 size={18} />
                  </button>
                  <button title="Ajouter aux favoris" className="rounded-full bg-white/90 dark:bg-black/40 p-3 shadow-sm hover:scale-105 transition" aria-label="Ajouter aux favoris">
                    <Heart size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-5 gap-3">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setSelected(i)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 ${i === selected ? "border-primary scale-105" : "border-transparent opacity-80 hover:opacity-100"} transition-transform`}
                      aria-label={`Afficher l'image ${i + 1}`}
                    >
                      <ImageWithSkeleton src={src} alt={`thumb-${i}`} width={120} height={120} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Info */}
          <section className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white">{product?.nom ?? "Produit non trouvé"}</h1>
              <p className="text-sm text-gray-500 mt-1">SKU: #{productId}</p>
            </div>

            <div className="flex flex-col gap-4">
              {/* Exemple des deux types de badges */}
              {product?.discount && (
                <div className="flex items-center gap-4">
                  <PromoBadge text={`-${product.discount}%`} />
                </div>
              )}
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold text-primary">{((product?.prix ?? 0) * 655.96).toLocaleString('fr-FR')} XAF</span>
                {product?.oldPrice && <span className="text-lg line-through text-gray-400">{(product.oldPrice * 655.96).toLocaleString('fr-FR')} XAF</span>}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1 text-sm text-gray-600"><Star className="text-yellow-400" /> {product?.note ?? 0}</span>
                <span className="text-sm text-gray-500">({product?.reviewCount ?? 0} avis)</span>
              </div>
              <div className="ml-auto text-sm text-green-600">En stock</div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <QuantityButton
                  type="decrement"
                  onClick={() => setQty(q => Math.max(1, q-1))}
                />
                <div className="px-4 py-2">{qty}</div>
                <QuantityButton
                  type="increment"
                  onClick={() => setQty(q => q+1)}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAdd} className="px-6 py-3 bg-primary text-white">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined">add_shopping_cart</span> Ajouter au panier</span>
                </Button>
                <Button variant="outline" className="px-6 py-3" onClick={handleBuyNow}>Acheter maintenant</Button>
              </div>
            </div>

            {added && (
              <div className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-green-50 text-green-700 dark:bg-green-900/30">
                <span className="material-symbols-outlined">check_circle</span>
                Ajouté au panier
              </div>
            )}

            {/* Tabs */}
            <div className="pt-6">
              <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                <nav className="flex gap-6 -mb-px">
                  <button
                    className={`pb-3 border-b-2 font-medium ${activeTab === 'description' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('description')}
                  >
                    Description
                  </button>
                  <button
                    className={`pb-3 border-b-2 font-medium ${activeTab === 'specs' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('specs')}
                  >
                    Caractéristiques
                  </button>
                  <button
                    className={`pb-3 border-b-2 font-medium ${activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    Avis
                  </button>
                </nav>
              </div>
              <div className="text-gray-700 dark:text-gray-300">
                {activeTab === 'description' && (
                  <div>
                    <p>Découvrez la Montre Intelligente Pro X, conçue pour suivre votre activité et rester connecté en toute élégance. Écran AMOLED, suivi cardio, GPS et autonomie prolongée.</p>
                  </div>
                )}
                {activeTab === 'specs' && (
                  <div>
                    <h4 className="font-semibold mb-2">Spécifications techniques :</h4>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Écran : AMOLED 1.4" 450x450 pixels</li>
                      <li>Processeur : Snapdragon Wear 4100+</li>
                      <li>Batterie : 420 mAh (jusqu\'à 40h d\'autonomie)</li>
                      <li>Connectivité : Bluetooth 5.0, Wi-Fi, GPS</li>
                      <li>Capteurs : Cardiofréquencemètre, accéléromètre, gyroscope</li>
                      <li>Étanchéité : 5 ATM (50 mètres)</li>
                      <li>Système : Wear OS by Google</li>
                    </ul>
                  </div>
                )}
                {activeTab === 'reviews' && (
                  <div>
                    <h4 className="font-semibold mb-4">Avis des utilisateurs :</h4>

                    {/* Review Form */}
                    <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h5 className="font-medium mb-3">Laisser un avis</h5>
                      <div className="mb-3">
                        <label className="block text-sm font-medium mb-2">Note :</label>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="focus:outline-none"
                              title={`Noter ${star} étoile${star > 1 ? 's' : ''}`}
                              aria-label={`Noter ${star} étoile${star > 1 ? 's' : ''}`}
                            >
                              <Star
                                size={20}
                                className={star <= reviewRating ? "text-yellow-400 fill-current" : "text-gray-300"}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="reviewComment" className="block text-sm font-medium mb-2">Commentaire :</label>
                        <textarea
                          id="reviewComment"
                          value={reviewComment}
                          onChange={(e) => setReviewComment(e.target.value)}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none"
                          rows={3}
                          placeholder="Partagez votre expérience avec ce produit..."
                          required
                        />
                      </div>
                      <Button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
                        Publier l\'avis
                      </Button>
                    </form>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={16} className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"} />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{review.name} - {review.date}</span>
                          </div>
                          <p className="text-sm">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Similar products (small grid) */}
            <div className="pt-6">
              <h3 className="text-lg font-bold mb-4">Vous aimerez aussi</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[1,2,3,4].map((i) => (
                  <Link key={i} href={`/produit/${i}`}>
                    <Card className="p-3 cursor-pointer hover:shadow-lg transition-shadow">
                      <img src={`https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop`} alt={`related-${i}`} className="w-full h-28 object-cover rounded-md mb-3" />
                      <div className="text-sm font-semibold">Produit similaire {i}</div>
                      <div className="text-primary font-bold">{((49 + i*20) * 655.96).toLocaleString('fr-FR')} XAF</div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
