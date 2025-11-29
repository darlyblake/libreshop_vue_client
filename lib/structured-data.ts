import { Metadata } from 'next'

export function generateProductStructuredData(product: {
  id: string
  nom: string
  description?: string
  prix: number
  note: number
  image?: string
  discount?: number
}) {
  const price = product.prix * 655.96
  const originalPrice = product.discount
    ? price / (1 - product.discount / 100)
    : price

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nom,
    description: product.description || `Découvrez ${product.nom} sur LibreShop`,
    image: product.image || '/placeholder-product.png',
    offers: {
      '@type': 'Offer',
      price: price.toFixed(2),
      priceCurrency: 'XAF',
      availability: 'https://schema.org/InStock',
      condition: 'https://schema.org/NewCondition',
      seller: {
        '@type': 'Organization',
        name: 'LibreShop'
      },
      ...(product.discount && {
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 jours
        originalPrice: originalPrice.toFixed(2)
      })
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.note,
      reviewCount: Math.floor(Math.random() * 50) + 10 // Simulation
    },
    brand: {
      '@type': 'Brand',
      name: 'LibreShop'
    }
  }
}

export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'LibreShop',
    url: 'http://localhost:3000',
    logo: 'http://localhost:3000/placeholder-logo.svg',
    description: 'Votre boutique en ligne pour tous vos besoins',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+237-XXX-XXX-XXX',
      contactType: 'customer service',
      availableLanguage: 'French'
    },
    sameAs: [
      'https://facebook.com/libreshop',
      'https://twitter.com/libreshop',
      'https://instagram.com/libreshop'
    ]
  }
}

export function generateWebSiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LibreShop',
    url: 'http://localhost:3000',
    description: 'Découvrez une large gamme de produits sur LibreShop',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'http://localhost:3000/produits?search={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  }
}
