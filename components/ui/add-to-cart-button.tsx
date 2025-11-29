import { ShoppingCart } from 'lucide-react'
import { Button } from './button'

interface AddToCartButtonProps {
  onClick?: (e: React.MouseEvent) => void
  className?: string
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
}

export function AddToCartButton({
  onClick,
  className = '',
  size = 'icon',
  disabled = false
}: AddToCartButtonProps) {
  return (
    <Button
      size={size}
      className={`bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors ${className}`}
      aria-label="Ajouter au panier"
      onClick={onClick}
      disabled={disabled}
    >
      <ShoppingCart className="h-5 w-5" />
      {size !== 'icon' && 'Ajouter au panier'}
    </Button>
  )
}
