// Page détail d'une catégorie
import Link from "next/link"
import { Header } from "@/components/Header"
import CategoryProductsClient from "@/components/CategoryProductsClient"
import { BackButton } from "@/components/ui/back-button"
import { getCategoryById } from "@/app/services/categoryService"
import { getProductsByCategory } from "@/app/services/productService"
import { Produit } from "@/app/models/Produit"
import { Category } from "@/app/models/Category"

async function getCategoryData(categoryId: string): Promise<{ category: Category | undefined, products: Produit[] }> {
    const [category, products] = await Promise.all([
        getCategoryById(categoryId),
        getProductsByCategory(categoryId)
    ]);
    return { category, products };
}

export default async function PageCategorie({ params }: { params: { id: string } }) {
  const { id: categoryId } = params;
  const { category, products } = await getCategoryData(categoryId);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />

        <main className="max-w-7xl mx-auto px-4 py-10">
          {/* Breadcrumb */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <nav className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                <Link href="/" className="hover:text-primary">Accueil</Link>
                <span className="mx-2">/</span>
                <Link href="/categories" className="hover:text-primary">Catégories</Link>
                <span className="mx-2">/</span>
                <span className="font-semibold text-gray-900 dark:text-white">Catégorie introuvable</span>
              </nav>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Catégorie introuvable
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <BackButton
                href="/categories"
                text="Retour aux catégories"
                showIcon={true}
                className="hidden md:inline-flex"
              />
              <Link href="/panier">
                <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition">Voir panier</button>
              </Link>
            </div>
          </div>

          {/* Message d'erreur au centre */}
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="max-w-md">
              <div className="text-6xl mb-4">📦</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Catégorie non trouvée
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                La catégorie que vous recherchez n'existe pas ou a été supprimée.
              </p>
              <div className="flex gap-4 justify-center">
                <Link href="/categories">
                  <button className="px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition">
                    Voir toutes les catégories
                  </button>
                </Link>
                <BackButton
                  href="/"
                  text="Retour à l'accueil"
                  showIcon={false}
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">LibreShop</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Votre boutique en ligne de confiance pour tous vos besoins.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Catégories</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/categories/electronique" className="hover:text-primary">High-Tech</Link></li>
                  <li><Link href="/categories/mode" className="hover:text-primary">Mode</Link></li>
                  <li><Link href="/categories/maison" className="hover:text-primary">Maison</Link></li>
                  <li><Link href="/categories/sport" className="hover:text-primary">Sport</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Service Client</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
                  <li><Link href="/faq" className="hover:text-primary">FAQ</Link></li>
                  <li><Link href="/livraison" className="hover:text-primary">Livraison</Link></li>
                  <li><Link href="/retours" className="hover:text-primary">Retours</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Légal</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><Link href="/mentions-legales" className="hover:text-primary">Mentions légales</Link></li>
                  <li><Link href="/confidentialite" className="hover:text-primary">Confidentialité</Link></li>
                  <li><Link href="/cgv" className="hover:text-primary">CGV</Link></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>&copy; 2024 LibreShop. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        {/* Breadcrumb + titre */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <nav className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              <Link href="/" className="hover:text-primary">Accueil</Link>
              <span className="mx-2">/</span>
              <Link href="/categories" className="hover:text-primary">Catégories</Link>
              <span className="mx-2">/</span>
              <span className="font-semibold text-gray-900 dark:text-white">{category.nom}</span>
            </nav>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              {category.nom}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Produits sélectionnés pour vous.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/categories">
              <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md transition">
                ← Retour aux catégories
              </button>
            </Link>
            <Link href="/panier">
              <button className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition">Voir panier</button>
            </Link>
          </div>
        </div>

        {/* Composant client qui affiche les produits et gère pagination/animations */}
        <CategoryProductsClient initialProducts={products} categoryName={category.nom} />
      </main>
    </div>
  )
}
