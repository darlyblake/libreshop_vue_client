"use client"

import { useMemo } from 'react'
import { Card } from './ui/card'
import { Separator } from './ui/separator'
import { Button } from './ui/button'
import { calculateCartTotal, formatPrice } from '@/lib/productUtils'
import { useCart } from '@/app/providers/CartProvider'

export function CartCalculator() {
  const { cartItems } = useCart()

  const totals = useMemo(() => {
    return calculateCartTotal(cartItems)
  }, [cartItems])

  if (cartItems.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-center text-gray-500">Votre panier est vide</p>
      </Card>
    )
  }

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Récapitulatif de la commande</h3>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Sous-total ({cartItems.length} article{cartItems.length > 1 ? 's' : ''})</span>
          <span>{formatPrice(totals.subtotal)}</span>
        </div>



        <div className="flex justify-between">
          <span>Livraison</span>
          <span>{totals.shipping === 0 ? 'Gratuite' : formatPrice(totals.shipping)}</span>
        </div>

        {totals.shipping === 0 && (
          <p className="text-xs text-green-600">Livraison gratuite pour les commandes supérieures à 50€</p>
        )}
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-semibold">
        <span>Total</span>
        <span className="text-primary">{formatPrice(totals.total)}</span>
      </div>

      <div className="space-y-2">
        <Button className="w-full" size="lg">
          Procéder au paiement
        </Button>

        <Button variant="outline" className="w-full">
          Continuer mes achats
        </Button>
      </div>

      <div className="text-xs text-gray-500 space-y-1">
        <p>• Livraison estimée: 2-3 jours ouvrés</p>
        <p>• Paiement sécurisé SSL</p>
        <p>• Retours sous 30 jours</p>
      </div>
    </Card>
  )
}
