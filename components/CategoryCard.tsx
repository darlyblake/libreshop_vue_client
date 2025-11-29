import Link from 'next/link';

interface CategoryCardProps {
  href: string;
  title: string;
  image: string;
}

export function CategoryCard({ href, title, image }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="relative bg-cover bg-center flex flex-col gap-3 rounded-xl justify-end p-4 aspect-square group overflow-hidden cursor-pointer" style={{backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%), url(${image})`}}>
        <p className="text-white text-xl font-bold leading-tight transition-transform duration-300 group-hover:-translate-y-2">{title}</p>
      </div>
    </Link>
  );
}