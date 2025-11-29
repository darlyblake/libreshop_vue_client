"use client"

import { useState, useEffect, useCallback } from 'react'

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  language: 'fr' | 'en'
  currency: 'XAF' | 'EUR' | 'USD'
  notifications: {
    cartUpdates: boolean
    orderUpdates: boolean
    promotions: boolean
  }
  display: {
    itemsPerPage: number
    compactView: boolean
    showPrices: boolean
  }
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  language: 'fr',
  currency: 'XAF',
  notifications: {
    cartUpdates: true,
    orderUpdates: true,
    promotions: false
  },
  display: {
    itemsPerPage: 12,
    compactView: false,
    showPrices: true
  }
}

const PREFERENCES_KEY = 'libreshop_preferences'

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(DEFAULT_PREFERENCES)
  const [isLoaded, setIsLoaded] = useState(false)

  // Charger les préférences depuis localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREFERENCES_KEY)
      if (stored) {
        const parsed = JSON.parse(stored)
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed })
      }
    } catch (error) {
      console.warn('Erreur lors du chargement des préférences:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Sauvegarder les préférences dans localStorage
  const savePreferences = useCallback((newPreferences: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPreferences }
    setPreferences(updated)

    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des préférences:', error)
    }
  }, [preferences])

  // Réinitialiser aux valeurs par défaut
  const resetPreferences = useCallback(() => {
    setPreferences(DEFAULT_PREFERENCES)
    try {
      localStorage.removeItem(PREFERENCES_KEY)
    } catch (error) {
      console.error('Erreur lors de la réinitialisation des préférences:', error)
    }
  }, [])

  // Mettre à jour une préférence spécifique
  const updatePreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    value: UserPreferences[K]
  ) => {
    savePreferences({ [key]: value })
  }, [savePreferences])

  // Mettre à jour une sous-préférence
  const updateNestedPreference = useCallback(<K extends keyof UserPreferences>(
    key: K,
    subKey: keyof UserPreferences[K],
    value: any
  ) => {
    const currentValue = preferences[key]
    if (typeof currentValue === 'object' && currentValue !== null) {
      savePreferences({
        [key]: { ...currentValue, [subKey]: value }
      })
    }
  }, [preferences, savePreferences])

  return {
    preferences,
    isLoaded,
    savePreferences,
    resetPreferences,
    updatePreference,
    updateNestedPreference
  }
}
