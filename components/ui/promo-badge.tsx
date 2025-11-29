interface PromoBadgeProps {
  text?: string;
  size?: 'sm' | 'base';
  className?: string;
}

export function PromoBadge({ 
  text = 'PROMO', 
  size = 'base',
  className = ''
}: PromoBadgeProps) {
  const sizeClasses = size === 'sm' 
    ? 'text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1' 
    : 'text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5';

  return (
    <span className={`font-bold rounded text-white ${sizeClasses} ${className}`} style={{ backgroundColor: 'red' }}>
      {text}
    </span>
  );
}