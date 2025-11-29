"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Loader2 } from 'lucide-react'
import { paymentService, PaymentMethod } from '@/app/services/paymentService'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  amount: number
  orderId: string
  userId: string
  onPaymentSuccess: (method: PaymentMethod, transactionId: string) => void
  onPaymentError: (error: string) => void
}

export function PaymentModal({
  isOpen,
  onClose,
  amount,
  orderId,
  userId,
  onPaymentSuccess,
  onPaymentError
}: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    phoneNumber: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [errors, setErrors] = useState<string[]>([])

  const paymentMethods = paymentService.getAvailableMethods()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setErrors([])
  }

  const handlePayment = async () => {
    if (!selectedMethod) return

    const request = {
      amount,
      currency: 'XAF',
      method: selectedMethod,
      orderId,
      userId,
      description: `Paiement commande ${orderId}`
    }

    const validation = paymentService.validatePayment(request)
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setIsProcessing(true)
    setErrors([])

    try {
      const response = await paymentService.processPayment(request)

      if (response.success && response.transactionId) {
        onPaymentSuccess(selectedMethod as PaymentMethod, response.transactionId)
        handleClose()
      } else {
        onPaymentError(response.message)
      }
    } catch (error) {
      onPaymentError('Erreur de connexion. Veuillez réessayer.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleClose = () => {
    setSelectedMethod(null)
    setFormData({ phoneNumber: '', cardNumber: '', expiryDate: '', cvv: '' })
    setErrors([])
    onClose()
  }

  const renderPaymentForm = () => {
    if (!selectedMethod) return null

    switch (selectedMethod) {
      case 'visa_mobile':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                maxLength={19}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Expiration</Label>
                <Input
                  id="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  maxLength={5}
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  maxLength={4}
                  type="password"
                />
              </div>
            </div>
          </div>
        )
      case 'airtel_money':
      case 'moov_money':
        return (
          <div>
            <Label htmlFor="phoneNumber">Numéro de téléphone</Label>
            <Input
              id="phoneNumber"
              placeholder="+225 01 02 03 04 05"
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
            />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Paiement - {amount.toFixed(2)} XAF</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Payment Methods */}
          <div>
            <Label className="text-base font-medium">Choisissez votre méthode de paiement</Label>
            <div className="grid grid-cols-1 gap-3 mt-3">
              {paymentMethods.map((method) => (
                <Card
                  key={method.id}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedMethod === method.id
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg">
                      {method.icon}
                    </div>
                    <div>
                      <div className="font-medium">{method.name}</div>
                      <div className="text-sm text-gray-500">{method.description}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          {renderPaymentForm()}

          {/* Errors */}
          {errors.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
              <ul className="text-sm text-red-600 dark:text-red-400 space-y-1">
                {errors.map((error, index) => (
                  <li key={index}>• {error}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={handleClose} className="flex-1">
              Annuler
            </Button>
            <Button
              onClick={handlePayment}
              disabled={!selectedMethod || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Traitement...
                </>
              ) : (
                'Payer'
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
