import { PromotionCard } from "@/components/PromotionCard";

interface Promotion {
  id: string;
  titre: string;
  sous: string;
  image: string;
  discountPercentage?: number;
}

interface PromotionSectionProps {
  promotions: Promotion[];
  title?: string;
  className?: string;
}

export const PromotionSection = ({
  promotions,
  title = "Promotions en vedette",
  className = ""
}: PromotionSectionProps) => {
  if (!promotions || promotions.length === 0) return null;

  return (
    <section className={`mb-8 ${className}`}>
      {title && (
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {promotions.map((promo) => (
          <PromotionCard
            key={promo.id}
            title={promo.titre}
            description={promo.sous}
            image={promo.image}
            buttonText="Voir l'offre"
            discountPercentage={promo.discountPercentage}
          />
        ))}
      </div>
    </section>
  );
};
