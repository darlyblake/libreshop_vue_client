"use client"

import { useForm } from '@/hooks/useForm'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Card } from './ui/card'
import { validateEmail, validatePhone } from '@/lib/productUtils'
import { useToast } from './ui/use-toast'

export function ContactForm() {
  const { toast } = useToast()

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    setValue,
    reset
  } = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    },
    validate: (values) => {
      const errors: Record<string, string> = {}

      if (!values.firstName.trim()) {
        errors.firstName = 'Le prénom est requis'
      }

      if (!values.lastName.trim()) {
        errors.lastName = 'Le nom est requis'
      }

      if (!values.email.trim()) {
        errors.email = 'L\'email est requis'
      } else if (!validateEmail(values.email)) {
        errors.email = 'Format d\'email invalide'
      }

      if (!values.phone.trim()) {
        errors.phone = 'Le téléphone est requis'
      } else if (!validatePhone(values.phone)) {
        errors.phone = 'Format de téléphone invalide (ex: +237612345678)'
      }

      if (!values.subject.trim()) {
        errors.subject = 'Le sujet est requis'
      }

      if (!values.message.trim()) {
        errors.message = 'Le message est requis'
      } else if (values.message.length < 10) {
        errors.message = 'Le message doit contenir au moins 10 caractères'
      }

      return errors
    },
    onSubmit: async (values) => {
      // Simulation d'envoi
      await new Promise(resolve => setTimeout(resolve, 2000))

      console.log('Formulaire soumis:', values)

      toast({
        title: "Message envoyé",
        description: "Nous vous répondrons dans les plus brefs délais.",
      })

      reset()
    }
  })

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Contactez-nous</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Prénom *</Label>
            <Input
              id="firstName"
              value={values.firstName}
              onChange={(e) => setValue('firstName', e.target.value)}
              className={errors.firstName ? 'border-red-500' : ''}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Nom *</Label>
            <Input
              id="lastName"
              value={values.lastName}
              onChange={(e) => setValue('lastName', e.target.value)}
              className={errors.lastName ? 'border-red-500' : ''}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={values.email}
            onChange={(e) => setValue('email', e.target.value)}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            type="tel"
            value={values.phone}
            onChange={(e) => setValue('phone', e.target.value)}
            placeholder="+237612345678"
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <Label htmlFor="subject">Sujet *</Label>
          <Input
            id="subject"
            value={values.subject}
            onChange={(e) => setValue('subject', e.target.value)}
            className={errors.subject ? 'border-red-500' : ''}
          />
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
          )}
        </div>

        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea
            id="message"
            value={values.message}
            onChange={(e) => setValue('message', e.target.value)}
            rows={5}
            className={errors.message ? 'border-red-500' : ''}
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </Button>
      </form>
    </Card>
  )
}
