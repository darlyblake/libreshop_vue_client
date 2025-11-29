"use client"

// Page de paiement/checkout
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Link from "next/link"
import { useState, useEffect } from 'react'
import { Header } from '@/components/Header'
import { QRCodeComponent } from '@/components/QRCodeComponent'
import { PaymentModal } from '@/components/PaymentModal'
import { useCart } from '@/app/providers/CartProvider'
import { createOrder, CartItem } from '@/app/services/orderService'
import { useToast } from '@/components/ui/use-toast'
import { PaymentMethod } from '@/app/services/paymentService'

export default function PageCheckout() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [orderId, setOrderId] = useState<string>('')
  const [isCreatingOrder, setIsCreatingOrder] = useState(false)
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup')
  const [confirmedOrder, setConfirmedOrder] = useState<{
    items: CartItem[];
    total: number;
    orderId: string;
    deliveryMethod: 'pickup' | 'delivery';
    paymentMethod?: PaymentMethod;
  } | null>(null)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const { cartItems, clearCart } = useCart()
  const { toast } = useToast()

  // Calculs dynamiques basés sur les articles du panier
  const sousTotal = cartItems.reduce((sum, item) => sum + (item.prix * item.quantite), 0)
  const fraisLivraison = deliveryMethod === 'delivery' ? 5.00 : 0
  const total = sousTotal + fraisLivraison

  const handleValidateOrder = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Panier vide",
        description: "Votre panier est vide. Ajoutez des produits avant de passer commande.",
        variant: "destructive"
      })
      return
    }

    if (deliveryMethod === 'delivery') {
      // Pour la livraison, ouvrir le modal de paiement
      setShowPaymentModal(true)
    } else {
      // Pour le retrait en boutique, créer directement la commande
      await createOrderDirectly()
    }
  }

  const createOrderDirectly = async (paymentMethod?: PaymentMethod) => {
    setIsCreatingOrder(true)

    try {
      // Créer la vraie commande dans la base de données
      const newOrder = await createOrder('user-1', cartItems, paymentMethod)

      // Stocker les informations de la commande avant de vider le panier
      setConfirmedOrder({
        items: [...cartItems],
        total: total,
        orderId: newOrder.id,
        deliveryMethod: deliveryMethod,
        paymentMethod: paymentMethod
      })

      setOrderId(newOrder.id)
      setShowConfirmation(true)

      // Vider le panier après validation
      clearCart()

      toast({
        title: "Commande créée avec succès !",
        description: `Votre commande ${newOrder.id} a été enregistrée.`,
      })
    } catch (error) {
      toast({
        title: "Erreur lors de la création de la commande",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive"
      })
    } finally {
      setIsCreatingOrder(false)
    }
  }

  const handlePaymentSuccess = async (method: PaymentMethod, transactionId: string) => {
    toast({
      title: "Paiement réussi !",
      description: `Transaction ${transactionId} confirmée.`,
    })

    // Créer la commande avec la méthode de paiement
    await createOrderDirectly(method)
  }

  const handlePaymentError = (error: string) => {
    toast({
      title: "Erreur de paiement",
      description: error,
      variant: "destructive"
    })
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-gray-800 dark:text-gray-200">
      <Header />

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 p-4 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary font-medium leading-normal">Accueil</Link>
          <span className="text-gray-500 font-medium leading-normal">/</span>
          <Link href="/panier" className="text-gray-500 hover:text-primary font-medium leading-normal">Panier</Link>
          <span className="text-gray-500 font-medium leading-normal">/</span>
          <span className="text-gray-900 font-medium leading-normal">Finalisation</span>
        </div>

        <div className="flex flex-wrap justify-between gap-3 p-4">
          <h1 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] min-w-72">Finaliser ma commande</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 p-4">
          {/* Méthode de collecte */}
          <div className="lg:col-span-2 space-y-6">
            {!showConfirmation && (
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Choisissez votre mode de retrait</h2>
                <div className="space-y-4">
                  <label className="flex items-center p-4 border-2 border-primary rounded-lg cursor-pointer bg-primary/10">
                    <input
                      type="radio"
                      name="collection-method"
                      checked={deliveryMethod === 'pickup'}
                      onChange={() => setDeliveryMethod('pickup')}
                      className="mr-3"
                    />
                    <div className="ml-4">
                      <p className="font-bold">Collecte en boutique</p>
                      <p className="text-sm text-gray-600">Gratuit - Récupérez votre commande directement au point de collecte du centre commercial.</p>
                    </div>
                  </label>
                  <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary">
                    <input
                      type="radio"
                      name="collection-method"
                      checked={deliveryMethod === 'delivery'}
                      onChange={() => setDeliveryMethod('delivery')}
                      className="mr-3"
                    />
                    <div className="ml-4">
                      <p className="font-bold">Livraison</p>
                      <p className="text-sm text-gray-600">5,00 € - Livraison à domicile.</p>
                    </div>
                  </label>
                </div>
              </Card>
            )}

            {/* Vue de confirmation */}
            {showConfirmation && (
              <Card className="p-6 text-center">
                <h2 className="text-2xl font-bold mb-2 text-green-500">Votre commande a été confirmée !</h2>
                <p className="text-gray-600 mb-4">Présentez ce QR Code en boutique pour récupérer vos achats.</p>
                <div className="flex justify-center mb-4">
                  <QRCodeComponent value={`Commande #${orderId} - ${confirmedOrder?.items.length || 0} article(s) - ${confirmedOrder?.deliveryMethod === 'delivery' ? 'Livraison' : 'Collecte'} - Total: ${((confirmedOrder?.total || 0) * 655.96).toLocaleString('fr-FR')} XAF`} size={200} />
                </div>
                <p className="font-semibold text-lg">Commande #<span className="text-primary">{orderId}</span></p>
                <p className="text-gray-600 mt-6 mb-2">Recevoir mon QR Code par :</p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <div className="flex-1">
                    <div className="relative">
                      <input type="email" placeholder="votre@email.com" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary" />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">email</span>
                    </div>
                    <Button className="mt-2 w-full bg-primary/20 text-primary hover:bg-primary/30">Envoyer</Button>
                  </div>
                  <div className="flex-1">
                    <div className="relative">
                      <input type="tel" placeholder="06 12 34 56 78" className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-primary" />
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">sms</span>
                    </div>
                    <Button className="mt-2 w-full bg-primary/20 text-primary hover:bg-primary/30">Envoyer</Button>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link href="/commandes">
                    <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90">Voir mes commandes</Button>
                  </Link>
                  <Link href="/">
                    <Button variant="outline" className="w-full sm:w-auto">Continuer mes achats</Button>
                  </Link>
                </div>
              </Card>
            )}
          </div>

          {/* Récapitulatif du panier */}
          <div>
            <Card className="p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Récapitulatif du panier</h2>

              {/* Articles */}
              <div className="space-y-4">
                {(showConfirmation ? confirmedOrder?.items || [] : cartItems).map((article, index: number) => (
                  <div key={index} className="flex items-center gap-4 py-2">
                    <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16" style={{ backgroundImage: `url("${article.image}")` }}></div>
                    <div className="flex-1">
                      <p className="font-medium leading-normal line-clamp-1">{article.nom}</p>
                      <p className="text-sm text-gray-500">{(article.prix * 655.96).toLocaleString('fr-FR')} XAF</p>
                    </div>
                    <p className="font-medium">x {article.quantite}</p>
                  </div>
                ))}
              </div>

              {/* Totaux */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                {showConfirmation ? (
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                    <span>Total</span>
                    <span className="text-primary">{((confirmedOrder?.total || 0) * 655.96).toLocaleString('fr-FR')} XAF</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Sous-total</span>
                      <span>{(sousTotal * 655.96).toLocaleString('fr-FR')} XAF</span>
                    </div>
                    {fraisLivraison > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Frais de livraison</span>
                        <span>{(fraisLivraison * 655.96).toLocaleString('fr-FR')} XAF</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200 mt-2">
                      <span>Total</span>
                      <span className="text-primary">{(total * 655.96).toLocaleString('fr-FR')} XAF</span>
                    </div>
                  </>
                )}
              </div>

              {!showConfirmation && (
                <Button
                  className="w-full bg-primary text-white hover:bg-primary/90 py-3 text-lg mt-4"
                  onClick={handleValidateOrder}
                  disabled={isCreatingOrder || cartItems.length === 0}
                >
                  {isCreatingOrder ? "Création de la commande..." : "Valider ma commande"}
                </Button>
              )}
            </Card>
          </div>
        </div>

        {/* Payment Modal */}
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          amount={total}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
      </div>
    </div>
  )
}
