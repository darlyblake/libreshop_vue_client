// Page détail d'un produit
import { Header } from "@/components/Header"
import { getProductById } from "@/app/services/productService"
import ProductDetailsClient from "./ProductDetailsClient"; // Import the new client component
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function PageProduit({ params }: { params: { id: string } }) {
  const productId = params.id;
  const product = await getProductById(productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="max-w-7xl mx-auto px-4 py-10 text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Produit non trouvé</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Le produit que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link href="/">
            <Button className="px-6 py-3 bg-primary text-white hover:bg-primary/90 transition">
              Retour à l'accueil
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
}
