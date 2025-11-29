import { ProductCard } from "@/components/ProductCard";
import { Produit } from "@/app/models/Produit";

interface ProductGridProps {
  products: Produit[];
  onAddToCart?: (productId: string) => void;
  className?: string;
  gridClassName?: string;
}

export const ProductGrid = ({
  products,
  onAddToCart,
  className = "",
  gridClassName = "grid-cols-3 gap-2 sm:gap-4"
}: ProductGridProps) => {
  return (
    <div className={className} aria-label="Grille de produits">
      <div className={`grid ${gridClassName}`}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.nom}
            price={product.prix}
            oldPrice={product.oldPrice}
            rating={product.note}
            image={product.image}
            discount={product.discount}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
};
