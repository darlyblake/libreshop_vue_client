"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Search,
  AlertCircle,
  User,
  MessageCircle,
  Star,
  Calendar,
  CreditCard,
  Scale,
  Ruler
} from 'lucide-react'
import { getOrders } from '@/app/services/orderService'
import { Order } from '@/app/models/Order'

// Types pour le suivi
interface TrackingStep {
  id: string
  title: string
  description: string
  date: string
  time: string
  completed: boolean
  location?: string
}

interface TrackingInfo {
  orderId: string
  trackingNumber: string
  status: 'confirmed' | 'preparing' | 'picked_up' | 'in_delivery' | 'awaiting_validation' | 'delivered'
  estimatedDelivery: string
  carrier: string
  steps: TrackingStep[]
  deliveryAddress: string
  customerName: string
  customerPhone: string
  orderDate: string
}

interface DeliveryDriver {
  id: string
  name: string
  photo: string
  phone: string
  status: string
  rating: number
  vehicle: string
}

export default function SuiviColisPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string

  const [order, setOrder] = useState<Order | null>(null)
  const [trackingInfo, setTrackingInfo] = useState<TrackingInfo | null>(null)
  const [deliveryDriver, setDeliveryDriver] = useState<DeliveryDriver | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchOrderId, setSearchOrderId] = useState('')

  // Simuler les données de suivi améliorées
  const generateTrackingInfo = (order: Order): TrackingInfo => {
    const now = new Date()
    const baseSteps: TrackingStep[] = [
      {
        id: 'confirmed',
        title: 'Commande confirmée',
        description: 'Votre commande a été confirmée et validée',
        date: new Date(order.date).toLocaleDateString('fr-FR'),
        time: new Date(order.date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
        completed: true,
        location: 'Centre de traitement LibreShop'
      },
      {
        id: 'preparing',
        title: 'Préparation en cours',
        description: 'Vos articles sont préparés avec soin',
        date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
        time: '14:30',
        completed: order.status !== 'not_paid',
        location: 'Entrepôt LibreShop'
      },
      {
        id: 'picked_up',
        title: 'Pris en charge par le livreur',
        description: 'Votre colis a été confié au livreur',
        date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
        time: '09:15',
        completed: order.status === 'paid_not_delivered' || order.status === 'paid_delivered',
        location: 'Centre logistique LibreShop'
      },
      {
        id: 'in_delivery',
        title: 'En cours de livraison',
        description: 'Le livreur est en route vers votre adresse',
        date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
        time: '16:45',
        completed: order.status === 'paid_delivered',
        location: 'En chemin vers votre adresse'
      },
      {
        id: 'awaiting_validation',
        title: 'En attente de validation',
        description: 'Le livreur attend votre validation de livraison',
        date: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
        time: '11:20',
        completed: order.status === 'paid_delivered',
        location: 'Votre adresse de livraison'
      },
      {
        id: 'delivered',
        title: 'Livré avec succès',
        description: 'Votre colis a été livré et réceptionné',
        date: order.deliveryDate ? new Date(order.deliveryDate).toLocaleDateString('fr-FR') : new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
        time: '15:30',
        completed: order.status === 'paid_delivered',
        location: 'Votre adresse de livraison'
      }
    ]

    let status: TrackingInfo['status'] = 'confirmed'
    if (order.status === 'paid_delivered') status = 'delivered'
    else if (order.status === 'paid_not_delivered') status = 'in_delivery'

    return {
      orderId: order.id,
      trackingNumber: order.trackingNumber || `TRK-${order.id.slice(-6).toUpperCase()}`,
      status,
      estimatedDelivery: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      carrier: 'LibreShop Express',
      steps: baseSteps,
      deliveryAddress: '123 Rue de la Liberté, 75001 Paris, France',
      customerName: 'Jean Dupont',
      customerPhone: '+33 6 12 34 56 78',
      orderDate: new Date(order.date).toLocaleDateString('fr-FR')
    }
  }

  // Simuler les informations du livreur
  const generateDeliveryDriver = (): DeliveryDriver => {
    return {
      id: 'DRV-023',
      name: 'Marc Leroy',
      photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      phone: '+33 6 98 76 54 32',
      status: 'En route vers vous',
      rating: 4.8,
      vehicle: 'Véhicule électrique - PEUGEOT e-208'
    }
  }

  useEffect(() => {
    const fetchOrderAndTracking = async () => {
      if (!orderId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        const userOrders = await getOrders('user-1')
        const foundOrder = userOrders.find(o => o.id === orderId)

        if (!foundOrder) {
          setError('Commande non trouvée')
          setLoading(false)
          return
        }

        // Vérifier que la commande peut être suivie (payée)
        if (foundOrder.status === 'not_paid') {
          setError('Cette commande n\'a pas encore été payée et ne peut pas être suivie.')
          setLoading(false)
          return
        }

        setOrder(foundOrder)
        const tracking = generateTrackingInfo(foundOrder)
        setTrackingInfo(tracking)
        setDeliveryDriver(generateDeliveryDriver())
      } catch (err) {
        setError('Erreur lors du chargement des informations de suivi')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderAndTracking()
  }, [orderId])

  const handleSearch = () => {
    if (searchOrderId.trim()) {
      router.push(`/suivi/${searchOrderId.trim()}`)
    }
  }

  const getStatusColor = (status: TrackingInfo['status']) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-500'
      case 'preparing': return 'bg-yellow-500'
      case 'picked_up': return 'bg-purple-500'
      case 'in_delivery': return 'bg-orange-500'
      case 'awaiting_validation': return 'bg-red-500'
      case 'delivered': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusText = (status: TrackingInfo['status']) => {
    switch (status) {
      case 'confirmed': return 'Confirmée'
      case 'preparing': return 'Préparation'
      case 'picked_up': return 'Pris en charge'
      case 'in_delivery': return 'En livraison'
      case 'awaiting_validation': return 'Validation'
      case 'delivered': return 'Livrée'
      default: return 'Inconnu'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Chargement des informations de suivi...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Erreur de suivi
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
            <div className="space-y-4">
              <div className="flex gap-4 justify-center">
                <Label htmlFor="searchOrderId" className="sr-only">Numéro de commande</Label>
                <Input
                  id="searchOrderId"
                  placeholder="Entrez votre numéro de commande"
                  value={searchOrderId}
                  onChange={(e) => setSearchOrderId(e.target.value)}
                  className="max-w-xs"
                />
                <Button onClick={handleSearch} disabled={!searchOrderId.trim()}>
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
              </div>
              <Link href="/commandes">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Retour à mes commandes
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!order || !trackingInfo) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Suivre mon colis
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Entrez votre numéro de commande pour suivre votre colis
            </p>
            <div className="flex gap-4 justify-center max-w-md mx-auto">
              <Label htmlFor="searchOrderId" className="sr-only">Numéro de commande</Label>
              <Input
                id="searchOrderId"
                placeholder="Ex: CMD-001"
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} disabled={!searchOrderId.trim()}>
                <Search className="h-4 w-4 mr-2" />
                Suivre
              </Button>
            </div>
            <div className="mt-6">
              <Link href="/commandes">
                <Button variant="outline">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Voir mes commandes
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap gap-2 mb-6 text-sm">
          <Link href="/" className="text-gray-500 hover:text-primary">Accueil</Link>
          <span className="text-gray-500">/</span>
          <Link href="/commandes" className="text-gray-500 hover:text-primary">Commandes</Link>
          <span className="text-gray-500">/</span>
          <span className="text-gray-900 dark:text-white font-medium">Suivi - {order.id}</span>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* 1. En-tête / Informations générales */}
          <Card className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Suivi de commande
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Commande #{order.id}
                </p>
              </div>
              <Badge className={`${getStatusColor(trackingInfo.status)} text-white text-xs sm:text-sm`}>
                {getStatusText(trackingInfo.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-3">
                <Package className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Numéro de commande</p>
                  <p className="font-semibold truncate">{trackingInfo.orderId}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Date de commande</p>
                  <p className="font-semibold">{trackingInfo.orderDate}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Destinataire</p>
                  <p className="font-semibold truncate">{trackingInfo.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm text-gray-500">Adresse de livraison</p>
                  <p className="font-semibold text-sm truncate">{trackingInfo.deliveryAddress}</p>
                </div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">L</span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">LibreShop</p>
                    <p className="text-sm text-gray-500">Boutique en ligne</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 ml-auto w-full sm:w-auto">
                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">Transporteur</p>
                      <p className="font-semibold truncate">{trackingInfo.carrier}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm text-gray-500">Livraison estimée</p>
                      <p className="font-semibold">{trackingInfo.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* 2. Ligne de progression (tracking visuel) */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              État de la livraison
            </h2>

            <div className="space-y-6">
              {trackingInfo.steps.map((step, index) => (
                <div key={step.id} className="flex gap-4">
                  {/* Indicateur de statut */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center
                      ${step.completed
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-400'
                      }
                    `}>
                      {step.completed ? (
                        <CheckCircle className="h-5 w-5" />
                      ) : (
                        <Clock className="h-5 w-5" />
                      )}
                    </div>
                    {index < trackingInfo.steps.length - 1 && (
                      <div className={`
                        w-0.5 h-16 mt-2
                        ${step.completed ? 'bg-green-500' : 'bg-gray-200 dark:bg-gray-700'}
                      `} />
                    )}
                  </div>

                  {/* Contenu de l'étape */}
                  <div className="flex-1 pb-6 min-w-0">
                    <div className="flex flex-col sm:flex-row items-start sm:items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className={`
                          font-semibold text-base sm:text-lg
                          ${step.completed
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-400'
                          }
                        `}>
                          {step.title}
                        </h3>
                        <p className={`
                          text-sm mt-1
                          ${step.completed
                            ? 'text-gray-600 dark:text-gray-300'
                            : 'text-gray-400 dark:text-gray-500'
                          }
                        `}>
                          {step.description}
                        </p>
                        {step.location && (
                          <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
                            <MapPin className="h-4 w-4 flex-shrink-0" />
                            <span className="truncate">{step.location}</span>
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-500 flex-shrink-0">
                        <p className="font-medium">{step.date}</p>
                        <p>{step.time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* 3. Informations du livreur */}
          {deliveryDriver && (
            <Card className="p-4 sm:p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Votre livreur
              </h2>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img
                    src={deliveryDriver.photo}
                    alt={deliveryDriver.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                      {deliveryDriver.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">ID: {deliveryDriver.id}</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-current flex-shrink-0" />
                      <span className="text-sm font-medium">{deliveryDriver.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <p className="text-sm text-gray-500 mb-1">Statut actuel</p>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200 text-xs sm:text-sm">
                    {deliveryDriver.status}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <a href={`tel:${deliveryDriver.phone}`} className="font-semibold text-primary hover:underline truncate">
                      {deliveryDriver.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="text-sm text-gray-500">Véhicule</p>
                    <p className="font-semibold truncate">{deliveryDriver.vehicle}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <Button className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contacter le livreur
                </Button>
                <Button variant="outline" className="flex-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  Voir sur la carte
                </Button>
              </div>
            </Card>
          )}

          {/* 4. Détails du colis */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Détails du colis
            </h2>

            <div className="space-y-4">
              {order.products.map((product) => (
                <div key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <img
                    src={product.image}
                    alt={product.nom}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{product.nom}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Qté: {product.quantity}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-semibold">{(product.quantity * product.prix * 655.96).toLocaleString('fr-FR')} XAF</p>
                    <p className="text-sm text-gray-500">({(product.prix * 655.96).toLocaleString('fr-FR')} XAF/u)</p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4 mt-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Scale className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-gray-500">Poids total</p>
                      <p className="font-semibold">2.5 kg</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-gray-500">Dimensions</p>
                      <p className="font-semibold">30x20x15 cm</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-gray-500">Paiement</p>
                      <p className="font-semibold">Payé en ligne</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Informations de contact */}
          <Card className="p-4 sm:p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Besoin d'aide ?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Service client LibreShop
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 flex-shrink-0" />
                    <span>01 23 45 67 89</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span>support@libreshop.fr</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Transporteur
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <p>{trackingInfo.carrier}</p>
                  <p>Numéro de suivi: {trackingInfo.trackingNumber}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/commandes">
              <Button variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retour à mes commandes
              </Button>
            </Link>
            <Button onClick={() => window.print()} className="w-full sm:w-auto">
              <Package className="h-4 w-4 mr-2" />
              Imprimer le suivi
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
