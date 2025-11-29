import { Header } from "@/components/Header"
import { getShops } from "@/app/services/shopService";
import { ShopGrid } from "@/components/ShopGrid";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

export default async function PageBoutiques({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const shopsPerPage = 9; // Display 9 shops per page

  const { shops, total } = await getShops(currentPage, shopsPerPage);
  const totalPages = Math.ceil(total / shopsPerPage);

  const getPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const maxPageNumbers = 5; // Max number of page links to show directly
    const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbers / 2));
    const endPage = Math.min(totalPages, startPage + maxPageNumbers - 1);

    if (startPage > 1) {
      items.push(
        <PaginationItem key="1">
          <PaginationLink href={`/boutiques?page=1`}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(<PaginationEllipsis key="ellipsis-start" />);
      }
    }

    for (let page = startPage; page <= endPage; page++) {
      items.push(
        <PaginationItem key={page}>
          <PaginationLink href={`/boutiques?page=${page}`} isActive={page === currentPage}>
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
          <PaginationLink href={`/boutiques?page=${totalPages}`}>{totalPages}</PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display text-text-light dark:text-text-dark">
      <Header />

      <main className="container mx-auto px-2 sm:px-4 py-4 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-8">
          <div className="w-full">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
              <p className="text-primary dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Toutes nos boutiques</p>
            </div>
            <ShopGrid
              shops={shops}
              gridClassName="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            />

            {totalPages > 1 && (
              <div className="mt-8">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious href={`/boutiques?page=${Math.max(1, currentPage - 1)}`} />
                    </PaginationItem>
                    {getPaginationItems()}
                    <PaginationItem>
                      <PaginationNext href={`/boutiques?page=${Math.min(totalPages, currentPage + 1)}`} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
