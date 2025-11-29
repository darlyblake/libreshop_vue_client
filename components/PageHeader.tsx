interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export const PageHeader = ({ title, description, className = "" }: PageHeaderProps) => {
  return (
    <header className={`mb-8 ${className}`}>
      <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
        {title}
      </h1>
      {description && (
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          {description}
        </p>
      )}
    </header>
  );
};
