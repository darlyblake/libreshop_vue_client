interface RatingProps {
  value: number;
  showScore?: boolean;
  size?: 'sm' | 'base';
}

export function Rating({ value, showScore = true, size = 'base' }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const textSize = size === 'sm' ? '!text-xs sm:!text-sm' : '!text-sm sm:!text-base';

  return (
    <div className="flex items-center">
      {fullStars > 0 && [...Array(fullStars)].map((_, i) => (
        <span
          key={`full-${i}`}
          className={`material-symbols-outlined ${textSize} !leading-none text-yellow-400`}
        >
          star
        </span>
      ))}
      {hasHalfStar && (
        <span
          className={`material-symbols-outlined ${textSize} !leading-none text-yellow-400`}
        >
          star_half
        </span>
      )}
      {emptyStars > 0 && [...Array(emptyStars)].map((_, i) => (
        <span
          key={`empty-${i}`}
          className={`material-symbols-outlined ${textSize} !leading-none text-gray-300`}
        >
          star_border
        </span>
      ))}
      {showScore && value !== undefined && (
        <span className={`text-[10px] sm:text-xs text-gray-500 ml-1`}>
          ({value.toFixed(1)})
        </span>
      )}
    </div>
  );
}
