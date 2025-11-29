import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className = "" }: BreadcrumbProps) => {
  return (
    <nav className={`text-sm text-gray-600 dark:text-gray-300 mb-3 ${className}`}>
      {items.map((item, index) => (
        <span key={index}>
          {index > 0 && <span className="mx-2">/</span>}
          {item.href ? (
            <Link href={item.href} className="hover:text-primary">
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-gray-900 dark:text-white">
              {item.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
};
