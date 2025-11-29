"use client"

import { useState, useCallback, useEffect } from 'react'

export interface FormField {
  value: any
  error?: string
  touched?: boolean
}

export interface FormState {
  [key: string]: FormField
}

export interface UseFormOptions {
  initialValues: Record<string, any>
  validate?: (values: Record<string, any>) => Record<string, string>
  onSubmit?: (values: Record<string, any>) => void | Promise<void>
}

export function useForm({ initialValues, validate, onSubmit }: UseFormOptions) {
  const [values, setValues] = useState<Record<string, any>>(initialValues)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isValid, setIsValid] = useState(false)

  // Validation automatique
  useEffect(() => {
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)
      setIsValid(Object.keys(validationErrors).length === 0)
    } else {
      setIsValid(true)
    }
  }, [values, validate])

  // Mettre à jour une valeur
  const setValue = useCallback((field: string, value: any) => {
    setValues(prev => ({ ...prev, [field]: value }))

    // Marquer comme touché
    setTouched(prev => ({ ...prev, [field]: true }))

    // Effacer l'erreur si elle existe
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }, [errors])

  // Mettre à jour plusieurs valeurs
  const setValuesBatch = useCallback((updates: Record<string, any>) => {
    setValues(prev => ({ ...prev, ...updates }))

    // Marquer tous les champs comme touchés
    const touchedUpdates: Record<string, boolean> = {}
    Object.keys(updates).forEach(key => {
      touchedUpdates[key] = true
    })
    setTouched(prev => ({ ...prev, ...touchedUpdates }))
  }, [])

  // Marquer un champ comme touché
  const setTouched = useCallback((field: string, isTouched: boolean = true) => {
    setTouched(prev => ({ ...prev, [field]: isTouched }))
  }, [])

  // Réinitialiser le formulaire
  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setIsSubmitting(false)
  }, [initialValues])

  // Soumettre le formulaire
  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault()
    }

    // Marquer tous les champs comme touchés
    const allTouched: Record<string, boolean> = {}
    Object.keys(values).forEach(key => {
      allTouched[key] = true
    })
    setTouched(allTouched)

    // Validation finale
    if (validate) {
      const validationErrors = validate(values)
      setErrors(validationErrors)

      if (Object.keys(validationErrors).length > 0) {
        return
      }
    }

    if (onSubmit) {
      setIsSubmitting(true)
      try {
        await onSubmit(values)
      } catch (error) {
        console.error('Erreur lors de la soumission:', error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }, [values, validate, onSubmit])

  // Obtenir la valeur d'un champ
  const getValue = useCallback((field: string) => values[field], [values])

  // Obtenir l'erreur d'un champ
  const getError = useCallback((field: string) => errors[field], [errors])

  // Vérifier si un champ est touché
  const isTouched = useCallback((field: string) => touched[field] || false, [touched])

  return {
    values,
    errors,
    touched,
    isSubmitting,
    isValid,
    setValue,
    setValuesBatch,
    setTouched,
    reset,
    handleSubmit,
    getValue,
    getError,
    isTouched
  }
}
