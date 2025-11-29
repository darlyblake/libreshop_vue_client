import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './button'

interface NavigationArrowProps {
  direction: 'left' | 'right'
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function NavigationArrow({
  direction,
  onClick,
  disabled = false,
  className = ''
}: NavigationArrowProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight

  return (
    <Button
      variant="ghost"
      size="icon"
      className={`hidden md:flex z-10 bg-white/70 hover:bg-white ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Icon className="h-6 w-6 text-gray-800" />
    </Button>
  )
}
