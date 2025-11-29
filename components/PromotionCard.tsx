import Link from 'next/link';
import { Button } from './ui/button';

interface PromotionCardProps {
  title: string;
  description: string;
  image: string;
  buttonText: string;
  discountPercentage?: number;
  href?: string;
}

export function PromotionCard({ title, description, image, buttonText, discountPercentage, href = "/produits" }: PromotionCardProps) {
  return (
    <div className="flex h-full flex-1 flex-col gap-4 rounded-xl bg-white dark:bg-gray-800 shadow-md min-w-[280px] overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
      <div className="w-full bg-center bg-no-repeat aspect-video bg-cover relative" style={{backgroundImage: `url(${image})`}}>
        {discountPercentage && (
          <div className="absolute top-2 right-2 text-white text-sm font-bold px-2 py-1 rounded" style={{ backgroundColor: 'red' }}>
            -{discountPercentage}%
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 justify-between p-4 pt-0 gap-4">
        <div>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">{title}</p>
          <p className="text-sm font-normal text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <Link href={href}>
          <Button variant="outline" className="w-full bg-yellow-400 text-gray-900 hover:bg-yellow-500 border-none font-bold"> {/* Changement de couleur pour coller au style Amazon */}
            {buttonText}
          </Button>
        </Link>
      </div>
    </div>
  );
}
