"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Switch } from './ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Card } from './ui/card'
import { Settings, Moon, Sun, Monitor } from 'lucide-react'
import { usePreferences } from '@/hooks/usePreferences'
import { useToast } from './ui/use-toast'

export function PreferencesModal() {
  const { preferences, updatePreference, updateNestedPreference, resetPreferences } = usePreferences()
  const { toast } = useToast()
  const [open, setOpen] = useState(false)

  const handleSave = () => {
    toast({
      title: "Préférences sauvegardées",
      description: "Vos préférences ont été mises à jour.",
    })
    setOpen(false)
  }

  const handleReset = () => {
    resetPreferences()
    toast({
      title: "Préférences réinitialisées",
      description: "Toutes les préférences ont été remises aux valeurs par défaut.",
    })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Préférences
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Préférences utilisateur</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thème */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Monitor className="h-5 w-5" />
              Apparence
            </h3>
            <div className="space-y-3">
              <div>
                <Label htmlFor="theme">Thème</Label>
                <Select
                  value={preferences.theme}
                  onValueChange={(value: 'light' | 'dark' | 'system') =>
                    updatePreference('theme', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">
                      <div className="flex items-center gap-2">
                        <Sun className="h-4 w-4" />
                        Clair
                      </div>
                    </SelectItem>
                    <SelectItem value="dark">
                      <div className="flex items-center gap-2">
                        <Moon className="h-4 w-4" />
                        Sombre
                      </div>
                    </SelectItem>
                    <SelectItem value="system">
                      <div className="flex items-center gap-2">
                        <Monitor className="h-4 w-4" />
                        Système
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view">Vue compacte</Label>
                <Switch
                  id="compact-view"
                  checked={preferences.display.compactView}
                  onCheckedChange={(checked) =>
                    updateNestedPreference('display', 'compactView', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="show-prices">Afficher les prix</Label>
                <Switch
                  id="show-prices"
                  checked={preferences.display.showPrices}
                  onCheckedChange={(checked) =>
                    updateNestedPreference('display', 'showPrices', checked)
                  }
                />
              </div>
            </div>
          </Card>

          {/* Langue et devise */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Régional</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="language">Langue</Label>
                <Select
                  value={preferences.language}
                  onValueChange={(value: 'fr' | 'en') =>
                    updatePreference('language', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="currency">Devise</Label>
                <Select
                  value={preferences.currency}
                  onValueChange={(value: 'XAF' | 'EUR' | 'USD') =>
                    updatePreference('currency', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XAF">FCFA (XAF)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                    <SelectItem value="USD">Dollar ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          {/* Notifications */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Notifications</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="cart-updates">Mises à jour du panier</Label>
                <Switch
                  id="cart-updates"
                  checked={preferences.notifications.cartUpdates}
                  onCheckedChange={(checked) =>
                    updateNestedPreference('notifications', 'cartUpdates', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="order-updates">Mises à jour des commandes</Label>
                <Switch
                  id="order-updates"
                  checked={preferences.notifications.orderUpdates}
                  onCheckedChange={(checked) =>
                    updateNestedPreference('notifications', 'orderUpdates', checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="promotions">Promotions et offres</Label>
                <Switch
                  id="promotions"
                  checked={preferences.notifications.promotions}
                  onCheckedChange={(checked) =>
                    updateNestedPreference('notifications', 'promotions', checked)
                  }
                />
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-between pt-4">
            <Button variant="outline" onClick={handleReset}>
              Réinitialiser
            </Button>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleSave}>
                Sauvegarder
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
