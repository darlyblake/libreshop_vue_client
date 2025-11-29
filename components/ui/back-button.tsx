import Link from 'next/link'
import { Button } from './button'

interface BackButtonProps {
  href: string
  text?: string
  showIcon?: boolean
  className?: string
  variant?: 'default' | 'outline' | 'ghost'
}

export function BackButton({
  href,
  text = 'Retour',
  showIcon = true,
  className = '',
  variant = 'outline'
}: BackButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant={variant}
        className={`hover:shadow-md transition ${className}`}
      >
        {showIcon && '← '}
        {text}
      </Button>
    </Link>
  )
}
