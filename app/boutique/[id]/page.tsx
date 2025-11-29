import { Header } from "@/components/Header";
import { getShopById } from "@/app/services/shopService";
import { getProductsByShopId } from "@/app/services/productService";
import { ProductGrid } from "@/components/ProductGrid";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Rating } from "@/components/ui/rating";

export default async function PageBoutique({ params }: { params: { id: string } }) {
  const shop = await getShopById(params.id);
  
  if (!shop) {
    notFound();
  }

  const products = await getProductsByShopId(params.id);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <Header />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-full h-64 rounded-lg overflow-hidden mb-4">
            <Image
              src={shop.image}
              alt={`Image de la boutique ${shop.nom}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
          <h1 className="text-4xl font-bold mb-2">{shop.nom}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{shop.description}</p>
          <Rating value={shop.note} size="lg" showScore />
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Produits de la boutique</h2>
          <ProductGrid
            products={products}
            gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          />
        </div>
      </main>
    </div>
  );
}
