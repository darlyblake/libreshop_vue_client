import { Minus, Plus } from 'lucide-react'

interface QuantityButtonProps {
  type: 'increment' | 'decrement'
  onClick: () => void
  disabled?: boolean
  className?: string
}

export function QuantityButton({
  type,
  onClick,
  disabled = false,
  className = ''
}: QuantityButtonProps) {
  const Icon = type === 'increment' ? Plus : Minus

  return (
    <button
      type="button"
      title={type === 'increment' ? 'Augmenter la quantité' : 'Réduire la quantité'}
      aria-label={type === 'increment' ? 'Augmenter la quantité' : 'Réduire la quantité'}
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${className}`}
    >
      <Icon size={16} aria-hidden="true" />
    </button>
  )
}
