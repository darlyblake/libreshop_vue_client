'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { QRCodeComponent } from '@/components/QRCodeComponent'; // Assurez-vous d'avoir ce composant
import { Trash2, Truck, FileText, Star, ShoppingBag } from 'lucide-react'; // Ajout d'icônes
import { Order } from '@/app/models/Order';
import { getOrders } from '@/app/services/orderService';

// Fonction pour obtenir le style du badge et le libellé selon le statut
const getStatusBadge = (status: Order['status']) => {
  switch (status) {
    case 'paid_delivered':
      return <Badge className="bg-green-600 hover:bg-green-700 text-white font-medium">Payée et Livrée</Badge>;
    case 'paid_not_delivered':
      return <Badge className="bg-blue-600 hover:bg-blue-700 text-white font-medium">En cours de Livraison</Badge>;
    case 'not_paid':
      return <Badge className="bg-red-600 hover:bg-red-700 text-white font-medium">Paiement Requis</Badge>;
    default:
      return null;
  }
};

// Fonction pour simuler une timeline de livraison (améliore l'UX)
const getDeliveryTimeline = (status: Order['status'], trackingNumber?: string) => {
  if (status === 'paid_delivered') {
    return (
      <div className="flex items-center text-sm text-green-600 dark:text-green-400 font-semibold">
        <ShoppingBag className="h-4 w-4 mr-2" />
        Livrée.
      </div>
    );
  }
  if (status === 'paid_not_delivered') {
    return (
      <div className="text-sm text-blue-600 dark:text-blue-400">
        <p className="font-semibold mb-1">Dernière Mise à jour : En transit.</p>
        {trackingNumber && (
          <p className="text-xs text-gray-500 dark:text-gray-400">N° Suivi: {trackingNumber}</p>
        )}
      </div>
    );
  }
  return null;
};

// --- Composant principal ---
export default function CommandesPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      // On suppose un utilisateur connecté avec l'id 'user-1'
      const userOrders = await getOrders('user-1');
      // Trier par date décroissante (plus récentes en premier)
      const sortedOrders = userOrders.sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setOrders(sortedOrders);
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const handleDelete = (orderId: string) => {
    // Logique de suppression (simulation)
    setOrders(currentOrders => currentOrders.filter(o => o.id !== orderId));
    alert(`La commande ${orderId} a été supprimée (simulation).`);
  };

  const handlePayment = (orderId: string) => {
    // Simulation de paiement
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId
          ? { ...order, status: 'paid_not_delivered' as const }
          : order
      )
    );
    alert(`Paiement de la commande ${orderId} effectué avec succès !`);
  };

  if (loading) return <div>Chargement des commandes...</div>

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gray-100 dark:bg-gray-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 border-b pb-2">
          Historique de vos Commandes
        </h1>

        <div className="space-y-8">
          {/* Badge pour indiquer les nouvelles commandes */}
          {orders.length > 0 && orders[0].status === 'not_paid' && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-blue-800 dark:text-blue-200 font-medium">
                  Vous avez une nouvelle commande en attente de paiement !
                </p>
              </div>
            </div>
          )}

          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">

              {/* En-tête de la commande (toujours visible) */}
              <div className="p-5 border-b border-gray-100 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                {/* Infos principales */}
                <div className="space-y-1">
                  <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">COMMANDE PASSÉE LE</h2>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {format(new Date(order.date), 'dd MMMM yyyy', { locale: fr })}
                  </p>
                </div>

                {/* Statut et Total */}
                <div className="space-y-1 text-right">
                  <div className="flex justify-end">{getStatusBadge(order.status)}</div>
                  <p className="text-2xl font-extrabold text-primary">
                    {(order.total * 655.96).toLocaleString('fr-FR')} XAF
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Commande #{order.id}</p>
                </div>
              </div>

              {/* Statut de livraison et Actions Rapides (Barre d'actions) */}
              <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gray-50 dark:bg-gray-700/50">

                <div className="min-w-[200px]">
                    {getDeliveryTimeline(order.status, order.trackingNumber)}
                </div>

                <div className="flex flex-wrap gap-3">
                  {order.status === 'not_paid' && (
                    <Button
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => handlePayment(order.id)}
                    >
                        💳 Payer maintenant
                    </Button>
                  )}
                  {order.status === 'paid_not_delivered' && (
                    <Link href={`/suivi/${order.id}`}>
                      <Button variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50/50 dark:hover:bg-blue-900/50">
                          <Truck className="h-4 w-4 mr-2" />
                          Suivre le colis
                      </Button>
                    </Link>
                  )}
                  {order.status === 'paid_delivered' && (
                    <Button variant="outline" className="text-green-600 border-green-600 hover:bg-green-50/50 dark:hover:bg-green-900/50">
                        <Star className="h-4 w-4 mr-2" />
                        Évaluer les produits
                    </Button>
                  )}
                  <Link href={`/suivi/${order.id}`}>
                    <Button variant="secondary">
                        <FileText className="h-4 w-4 mr-2" />
                        Afficher la facture
                    </Button>
                  </Link>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => handleDelete(order.id)}
                    className="shrink-0"
                    title="Annuler la commande"
                    disabled={order.status === 'paid_delivered'}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Détails de la commande (Accordion) */}
              <Accordion type="single" collapsible className="p-5 w-full">
                <AccordionItem value="products" className="border-b-0">
                  <AccordionTrigger className="text-base text-gray-700 dark:text-gray-300 hover:no-underline hover:text-primary transition-colors">
                    Détails et produits commandés ({order.products.length} articles)
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-6 pt-4">
                      {order.products.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center gap-4 p-3 rounded-lg border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 transition-shadow hover:shadow-md"
                        >
                          <img
                            src={product.image}
                            alt={product.nom}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold text-base">{product.nom}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Qté: {product.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                             <p className="font-bold text-lg">
                               {(product.quantity * product.prix * 655.96).toLocaleString('fr-FR')} XAF
                             </p>
                             <p className="text-xs text-gray-500 dark:text-gray-400">
                               ({(product.prix * 655.96).toLocaleString('fr-FR')} XAF l'unité)
                             </p>
                          </div>
                        </div>
                      ))}

                      {/* Section QR Code / Options supplémentaires */}
                       <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                           <div className="flex items-center gap-4">
                              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Référence rapide (Scan)</p>
                              <QRCodeComponent
                                value={`https://libreshop.fr/commandes/${order.id}`}
                                size={64}
                              />
                           </div>
                           <p className="text-xl font-bold">
                             Total final: <span className='text-primary'>{(order.total * 655.96).toLocaleString('fr-FR')} XAF</span>
                           </p>
                       </div>

                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          ))}
        </div>

        {/* Call to action si aucune commande */}
        {orders.length === 0 && (
          <div className="text-center p-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold">Aucune commande trouvée.</p>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Commencez vos achats dès maintenant !</p>
            <Button className="mt-4 bg-primary hover:bg-primary/90">Parcourir les produits</Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
