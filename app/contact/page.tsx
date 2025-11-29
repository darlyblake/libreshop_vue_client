// Page de contact
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function PageContact() {
  return (
    <div className="min-h-screen bg-background">
      {/* En-tête */}
      <header className="sticky top-0 z-50 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ShopHub
          </Link>
          <div className="flex gap-4">
            <Link
              href="/panier"
              className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition"
            >
              Panier
            </Link>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Fil d'Ariane */}
        <div className="flex gap-2 text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary">
            Accueil
          </Link>
          <span>/</span>
          <span className="text-foreground">Contact</span>
        </div>

        {/* Titre */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contactez-nous</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Notre équipe est là pour vous aider. N'hésitez pas à nous contacter pour toute question.
          </p>
        </div>

        {/* Contenu en grille */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-6">Envoyez-nous un message</h2>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="prenom" className="block text-sm font-medium mb-2">
                    Prénom *
                  </label>
                  <Input id="prenom" placeholder="Votre prénom" required />
                </div>
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium mb-2">
                    Nom *
                  </label>
                  <Input id="nom" placeholder="Votre nom" required />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email *
                </label>
                <Input id="email" type="email" placeholder="votre@email.com" required />
              </div>
              <div>
                <label htmlFor="sujet" className="block text-sm font-medium mb-2">
                  Sujet *
                </label>
                <Input id="sujet" placeholder="Objet de votre message" required />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  placeholder="Votre message..."
                  rows={6}
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-primary text-primary-foreground hover:opacity-90">
                Envoyer le message
              </Button>
            </form>
          </Card>

          {/* Informations de contact */}
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-gray-600">contact@shophub.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Téléphone</p>
                    <p className="text-gray-600">+33 1 23 45 67 89</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-gray-600">123 Rue du Commerce<br />75001 Paris, France</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="text-primary" size={20} />
                  <div>
                    <p className="font-medium">Horaires</p>
                    <p className="text-gray-600">Lun-Ven: 9h-18h<br />Sam: 10h-17h</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4">FAQ</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Comment suivre ma commande ?</h4>
                  <p className="text-gray-600 text-sm">
                    Vous recevrez un email avec le numéro de suivi une fois votre commande expédiée.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Politique de retour</h4>
                  <p className="text-gray-600 text-sm">
                    Retours acceptés sous 30 jours avec l'emballage d'origine.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Support technique</h4>
                  <p className="text-gray-600 text-sm">
                    Notre équipe technique est disponible pour vous aider avec vos produits.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
