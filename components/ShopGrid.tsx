import { ShopCard } from "@/components/ShopCard";
import { Shop } from "@/app/models/Shop";

interface ShopGridProps {
  shops: Shop[];
  className?: string;
  gridClassName?: string;
}

export const ShopGrid = ({
  shops,
  className = "",
  gridClassName = "grid-cols-3 gap-2 sm:gap-4"
}: ShopGridProps) => {
  return (
    <div className={className} aria-label="Grille des boutiques">
      <div className={`grid ${gridClassName}`}>
        {shops.map(shop => (
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
  );
};
