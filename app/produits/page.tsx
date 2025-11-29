import { Header } from "@/components/Header"
import { Rating } from "@/components/ui/rating";
import { ProductGrid } from "@/components/ProductGrid";
import { getHardcodedProducts } from "@/app/services/productService";
import { Produit } from "@/app/models/Produit";

export default async function PageProduits({ searchParams }: { searchParams: Promise<{ filter?: string }> }) {
  const filter = (await searchParams).filter;
  const products = await getHardcodedProducts();

  const getTitle = () => {
    switch (filter) {
      case 'meilleures-ventes':
        return 'Meilleures Ventes';
      case 'promotions-flash':
        return 'Ventes Flash du jour';
      case 'tous-les-produits':
        return 'Tous les Produits';
      default:
        return 'Électronique';
    }
  };

  const handleAddToCart = async (productId: string) => {
    'use server'
    try {
      const { addToCart } = await import("@/app/services/orderService");
      await addToCart(productId);
      console.log('Produit ajouté au panier:', productId);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <Header />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          {/* Sidebar pour filtres (visible sur desktop, off-canvas sur mobile) */}
          <aside className="w-full lg:w-1/4 xl:w-1/5 hidden lg:block">
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg mb-4">Filtres</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Prix</h4>
                    <div className="flex items-center gap-2">
                      <input className="form-input w-full rounded-md border-accent bg-white dark:bg-background-dark dark:border-gray-700 h-10 text-sm" placeholder="Min" type="number" />
                      <span>-</span>
                      <input className="form-input w-full rounded-md border-accent bg-white dark:bg-background-dark dark:border-gray-700 h-10 text-sm" placeholder="Max" type="number" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Disponibilité</h4>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input className="form-checkbox rounded text-primary focus:ring-primary/50" type="checkbox" />
                        <span>En stock</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input className="form-checkbox rounded text-primary focus:ring-primary/50" type="checkbox" />
                        <span>Click & Collect</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Promotions</h4>
                    <label className="flex items-center gap-2">
                      <input className="form-checkbox rounded text-primary focus:ring-primary/50" type="checkbox" />
                      <span>En promotion</span>
                    </label>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Note</h4>
                    <div className="flex items-center">
                      <Rating value={4} showScore={false} />
                      <span className="ml-2 text-sm text-gray-500">et plus</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
          {/* Contenu principal */}
          <div className="w-full lg:w-3/4 xl:w-4/5">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <p className="text-primary dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">{getTitle()}</p>
              <div className="flex items-center gap-4">
                <button className="lg:hidden flex h-10 items-center justify-center gap-x-2 rounded-lg bg-gray-200 dark:bg-gray-800 px-4">
                  <span className="material-symbols-outlined">filter_list</span>
                  <p className="text-sm font-medium">Filtres</p>
                </button>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium" htmlFor="sort">Trier par:</label>
                  <select className="form-select rounded-lg border-accent bg-white dark:bg-background-dark dark:border-gray-700 h-10 text-sm font-medium pr-8" id="sort">
                    <option>Popularité</option>
                    <option>Prix : Croissant</option>
                    <option>Prix : Décroissant</option>
                  </select>
                </div>
              </div>
            </div>
            <ProductGrid
              products={products}
              onAddToCart={handleAddToCart}
            />
            <div className="flex items-center justify-center p-4 mt-8">
              <a className="flex size-10 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full" href="#">
                <span className="material-symbols-outlined">chevron_left</span>
              </a>
              <a className="text-sm font-bold leading-normal flex size-10 items-center justify-center text-white bg-primary rounded-full" href="#">1</a>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full" href="#">2</a>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full" href="#">3</a>
              <span className="text-sm font-normal leading-normal flex size-10 items-center justify-center" >...</span>
              <a className="text-sm font-normal leading-normal flex size-10 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full" href="#">10</a>
              <a className="flex size-10 items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full" href="#">
                <span className="material-symbols-outlined">chevron_right</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
