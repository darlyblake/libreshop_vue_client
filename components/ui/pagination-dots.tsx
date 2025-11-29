interface PaginationDotsProps {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}

export function PaginationDots({
  totalPages,
  currentPage,
  onPageChange,
  className = ''
}: PaginationDotsProps) {
  return (
    <div className={`flex justify-center gap-2 mt-4 ${className}`}>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          aria-label={`Aller à la page ${i + 1}`}
          className={`w-2 h-2 rounded-full transition-colors ${
            i === currentPage
              ? 'bg-primary'
              : 'bg-gray-300 hover:bg-gray-400'
          }`}
          onClick={() => onPageChange(i)}
        />
      ))}
    </div>
  )
}
