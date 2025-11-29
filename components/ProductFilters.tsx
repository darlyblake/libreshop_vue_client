"use client"

import { useState, useMemo } from 'react'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Slider } from './ui/slider'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { Card } from './ui/card'

export interface ProductFilters {
  sortBy: 'name' | 'price-asc' | 'price-desc' | 'rating' | 'newest'
  priceRange: [number, number]
  categories: string[]
  inStock: boolean
  onSale: boolean
}

interface ProductFiltersProps {
  filters: ProductFilters
  onFiltersChange: (filters: ProductFilters) => void
  availableCategories: string[]
  maxPrice: number
}

export function ProductFiltersComponent({
  filters,
  onFiltersChange,
  availableCategories,
  maxPrice
}: ProductFiltersProps) {
  const updateFilters = (updates: Partial<ProductFilters>) => {
    onFiltersChange({ ...filters, ...updates })
  }

  return (
    <Card className="p-6 space-y-6">
      <div>
        <Label className="text-base font-semibold mb-3 block">Trier par</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value: ProductFilters['sortBy']) => updateFilters({ sortBy: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Nom (A-Z)</SelectItem>
            <SelectItem value="price-asc">Prix croissant</SelectItem>
            <SelectItem value="price-desc">Prix décroissant</SelectItem>
            <SelectItem value="rating">Meilleures notes</SelectItem>
            <SelectItem value="newest">Plus récent</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">
          Prix: {(filters.priceRange[0] * 655.96).toLocaleString('fr-FR')} - {(filters.priceRange[1] * 655.96).toLocaleString('fr-FR')} XAF
        </Label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => updateFilters({ priceRange: value as [number, number] })}
          max={maxPrice}
          min={0}
          step={1}
          className="w-full"
        />
      </div>

      <div>
        <Label className="text-base font-semibold mb-3 block">Catégories</Label>
        <div className="space-y-2">
          {availableCategories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) => {
                  const newCategories = checked
                    ? [...filters.categories, category]
                    : filters.categories.filter(c => c !== category)
                  updateFilters({ categories: newCategories })
                }}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="inStock"
            checked={filters.inStock}
            onCheckedChange={(checked) => updateFilters({ inStock: !!checked })}
          />
          <Label htmlFor="inStock" className="text-sm">En stock uniquement</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="onSale"
            checked={filters.onSale}
            onCheckedChange={(checked) => updateFilters({ onSale: !!checked })}
          />
          <Label htmlFor="onSale" className="text-sm">En promotion</Label>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => onFiltersChange({
          sortBy: 'name',
          priceRange: [0, maxPrice],
          categories: [],
          inStock: false,
          onSale: false
        })}
        className="w-full"
      >
        Réinitialiser les filtres
      </Button>
    </Card>
  )
}
