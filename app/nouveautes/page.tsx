import Link from "next/link"
import ImageWithSkeleton from '@/components/ImageWithSkeleton'
import { Header } from "@/components/Header"
import { PromotionCard } from "@/components/PromotionCard"
import { PromoBadge } from "@/components/ui/promo-badge"
import { Card } from "@/components/ui/card"
import { addToCart } from "@/app/services/orderService"
import { ProductGrid } from "@/components/ProductGrid"
import { getNewProducts } from "@/app/services/productService"
import { Produit } from "@/app/models/Produit"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default async function PageNouveau({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const productsPerPage = 12; // Display 12 products per page

  const { products, total } = await getNewProducts(currentPage, productsPerPage);
  const totalPages = Math.ceil(total / productsPerPage);

  const handleAddToCart = async (productId: string) => {
    'use server'
    try {
      await addToCart(productId);
      console.log('Produit ajouté au panier:', productId);
    } catch (error) {
      console.error('Erreur lors de l\'ajout au panier:', error);
    }
  }

  const getPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const maxPageNumbers = 5; // Max number of page links to show directly
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink href={`/nouveautes?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink href={`/nouveautes?page=${page}`} isActive={page === currentPage}>
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(<PaginationEllipsis key="ellipsis-end" />);
      }
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink href={`/nouveautes?page=${totalPages}`}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">Nouveautés</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Découvrez les derniers arrivages et offres spéciales.</p>
        </header>

        <section className="mb-8">
          <ProductGrid
            products={products}
            onAddToCart={handleAddToCart}
          />
        </section>

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href={`/nouveautes?page=${Math.max(1, currentPage - 1)}`} />
                </PaginationItem>
                {getPaginationItems()}
                <PaginationItem>
                  <PaginationNext href={`/nouveautes?page=${Math.min(totalPages, currentPage + 1)}`} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>
    </div>
  )
}
