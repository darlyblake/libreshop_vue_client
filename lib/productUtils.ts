import { Produit } from '@/app/models/Produit'
import { ProductFilters } from '@/components/ProductFilters'

export function filterAndSortProducts(products: Produit[], filters: ProductFilters): Produit[] {
  let filtered = [...products]

  // Filtre par catégories
  if (filters.categories.length > 0) {
    filtered = filtered.filter(product =>
      filters.categories.some(category =>
        product.nom.toLowerCase().includes(category.toLowerCase()) ||
        product.categoryId.toLowerCase().includes(category.toLowerCase())
      )
    )
  }

  // Filtre par prix
  filtered = filtered.filter(product =>
    product.prix >= filters.priceRange[0] && product.prix <= filters.priceRange[1]
  )

  // Filtre en stock (simulé - tous les produits sont considérés en stock)
  if (filters.inStock) {
    // Simulé - considérer tous les produits comme en stock
    filtered = filtered
  }

  // Filtre en promotion
  if (filters.onSale) {
    filtered = filtered.filter(product => product.discount && product.discount > 0)
  }

  // Tri
  filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'name':
        return a.nom.localeCompare(b.nom)
      case 'price-asc':
        return a.prix - b.prix
      case 'price-desc':
        return b.prix - a.prix
      case 'rating':
        return b.note - a.note
      case 'newest':
        // Simulé - tri par ID décroissant
        return parseInt(b.id) - parseInt(a.id)
      default:
        return 0
    }
  })

  return filtered
}

export function calculateCartTotal(cartItems: Array<{ prix: number; quantite: number }>): {
  subtotal: number
  tax: number
  shipping: number
  total: number
} {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.prix * item.quantite), 0)
  const tax = 0 // TVA supprimée
  const shipping = subtotal > 50 ? 0 : 5 // Livraison gratuite > 50€
  const total = subtotal + tax + shipping

  return { subtotal, tax, shipping, total }
}

export function formatPrice(price: number, currency: string = 'XAF'): string {
  return (price * 655.96).toLocaleString('fr-FR') + ' ' + currency
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^(\+237|237)?[6-9]\d{8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export function generateOrderNumber(): string {
  const timestamp = Date.now()
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `LIB-${timestamp}-${random}`
}
