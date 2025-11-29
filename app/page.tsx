import Link from 'next/link';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PromotionCard } from '@/components/PromotionCard';
import { CategoryCard } from '@/components/CategoryCard';
import { TrendingProducts } from '@/components/TrendingProducts';
import { Footer } from '@/components/Footer';
import { getTrendingProducts } from '@/app/services/productService';
import { getShops } from '@/app/services/shopService';
import { ShopCard } from '@/components/ShopCard';
import { generateOrganizationStructuredData, generateWebSiteStructuredData } from '@/lib/structured-data';
import Script from 'next/script';

export default async function PageAccueil() {
  // Récupération des données via le service
  let trendingProductsData: any[] = [];
  try {
    trendingProductsData = await getTrendingProducts();
  } catch (error) {
    console.warn('Failed to fetch trending products during build:', error);
    // Fallback to empty array during build
  }

  let shopsData: any[] = [];
  try {
    shopsData = (await getShops()).shops;
  } catch (error) {
    console.warn('Failed to fetch shops during build:', error);
    // Fallback to empty array during build
  }

  const organizationStructuredData = generateOrganizationStructuredData();
  const webSiteStructuredData = generateWebSiteStructuredData();

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-gray-100 dark:bg-gray-900 font-display text-gray-800 dark:text-gray-200">
      <Script
        id="organization-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationStructuredData),
        }}
      />
      <Script
        id="website-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSiteStructuredData),
        }}
      />
      <div className="layout-container flex h-full grow flex-col">
        <Header />

        <main className="flex-1">
          <HeroSection />

          {/* Section 1 : Grille 4 colonnes Amazon-like, positionnée sous le Hero */}
          <div className="container mx-auto px-2 py-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 -mt-16 relative z-10">

            {/* Colonne 1 : Tendances du moment (Vignettes) */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl">
              <h2 className="text-lg font-bold mb-3">Tendances du moment</h2>
              <div className="grid grid-cols-2 gap-2">
                <Link href="/categories/electronique" className="hover:opacity-90">
                  <div className="aspect-square relative">
                    <img src="/casque.jpg" alt="Électronique" className="object-cover rounded" />
                  </div>
                  <p className="text-sm mt-1">High-Tech</p>
                </Link>
                <Link href="/categories/mode" className="hover:opacity-90">
                  <div className="aspect-square relative">
                    <img src="/mode-vetements.jpg" alt="Mode" className="object-cover rounded" />
                  </div>
                  <p className="text-sm mt-1">Mode</p>
                </Link>
                <Link href="/categories/maison" className="hover:opacity-90">
                  <div className="aspect-square relative">
                    <img src="/decoration-maison.jpg" alt="Maison" className="object-cover rounded" />
                  </div>
                  <p className="text-sm mt-1">Maison</p>
                </Link>
                <Link href="/categories/beaute" className="hover:opacity-90">
                  <div className="aspect-square relative">
                    <img src="/lunettes.jpg" alt="Beauté" className="object-cover rounded" />
                  </div>
                  <p className="text-sm mt-1">Beauté</p>
                </Link>
              </div>
              <Link href="/produits" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-3 block">
                Voir tous les produits
              </Link>
            </div>

            {/* Colonne 2 : Ventes Flash (Utilisation de PromotionCard) */}
            <div className="shadow-xl">
              <PromotionCard
                title="Ventes Flash du jour"
                description="Jusqu'à -50% sur une sélection de produits limitée dans le temps."
                image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
                buttonText="Voir les offres"
                discountPercentage={50}
                href="/produits?filter=promotions-flash"
              />
            </div>

            {/* Colonne 3 : Nouveautés (Utilisation de PromotionCard) */}
            <div className="shadow-xl">
               <PromotionCard
                title="Découvrez les Nouveautés"
                description="Les produits les plus récents de nos marques partenaires sont là."
                image="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=400&fit=crop"
                buttonText="Acheter maintenant"
                discountPercentage={15}
                href="/nouveautes"
              />
            </div>

            {/* Colonne 4 : Découvrir nos univers (Utilisation de CategoryCard) */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-xl">
              <h2 className="text-lg font-bold mb-3">Parcourir les catégories</h2>
              <div className="grid grid-cols-2 gap-2">
                <CategoryCard href="/categories/mode" title="Mode" image="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop" />
                <CategoryCard href="/categories/electronique" title="High-Tech" image="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop" />
                <CategoryCard href="/categories/maison" title="Maison" image="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop" />
                <CategoryCard href="/categories/beaute" title="Beauté" image="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" />
              </div>
              <Link href="/categories" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-3 block">
                Toutes les catégories
              </Link>
            </div>
          </div>

          {/* Section 2 : Produits Tendance (Carrousel) - Utilisation de TrendingProducts mis à jour */}
          <div className="container mx-auto px-2 py-8 mt-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Les Produits les plus commandés</h2>
              <TrendingProducts products={trendingProductsData.map(p => ({
                id: p.id,
                name: p.nom,
                prix: p.prix,
                oldPrice: p.oldPrice,
                discount: p.discount,
                image: p.image,
                isNew: p.isNew,
                isTrending: p.isTrending,
                rating: p.note,
                reviewCount: p.reviewCount || 0
              }))} />
            </div>
          </div>

          {/* Section Shops */}
          <div className="container mx-auto px-2 py-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Découvrez nos boutiques</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopsData.map(shop => (
                  <ShopCard
                    key={shop.id}
                    id={shop.id}
                    nom={shop.nom}
                    description={shop.description}
                    note={shop.note}
                    image={shop.image}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section 3 : Meilleures ventes par catégorie (Gros carrousel de vignettes) */}
          <div className="container mx-auto px-2 py-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Meilleures ventes par catégorie</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <Link href="/categories/electronique" className="group">
                  <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-colors">
                    <img src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop" alt="High-Tech" className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">High-Tech</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Meilleures ventes</p>
                  </div>
                </Link>
                <Link href="/categories/mode" className="group">
                  <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-colors">
                    <img src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop" alt="Mode" className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">Mode</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Tendances</p>
                  </div>
                </Link>
                <Link href="/categories/maison" className="group">
                  <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-colors">
                    <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop" alt="Maison" className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">Maison</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Nouveautés</p>
                  </div>
                </Link>
                <Link href="/categories/beaute" className="group">
                  <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-colors">
                    <img src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop" alt="Beauté" className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">Beauté</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Promotions</p>
                  </div>
                </Link>
                <Link href="/categories/sport" className="group">
                  <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-colors">
                    <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop" alt="Sports" className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">Sports</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Découvrir</p>
                  </div>
                </Link>
                <Link href="/categories/jeux" className="group">
                  <div className="aspect-square relative overflow-hidden rounded-lg border border-gray-200 hover:border-primary transition-colors">
                    <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=400&fit=crop" alt="Jeux" className="object-cover w-full h-full group-hover:scale-105 transition-transform" />
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">Jeux</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Top ventes</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
