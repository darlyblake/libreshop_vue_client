"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Header } from "@/components/Header"
import { Category } from "@/app/models/Category"

interface CategoriesClientProps {
  categories: Category[];
}

export default function CategoriesClient({ categories }: CategoriesClientProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-8 tracking-tight text-center">
          Explorez nos <span className="text-primary">Catégories</span>
        </h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {categories.map((categorie) => (
            <Link href={`/categories/${categorie.id}`} key={categorie.id}>
              <Card className="group relative overflow-hidden h-72 transform transition-all duration-500 hover:scale-[1.02]">
                <div className="absolute inset-0">
                  <img
                    src={categorie.image}
                    alt={categorie.nom}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2 transform transition-transform duration-300 group-hover:translate-x-2">
                    {categorie.nom}
                  </h3>
                  <p className="text-gray-300 transform transition-transform duration-300 group-hover:translate-x-2">
                    {categorie.description}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 w-fit bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 transform transition-all duration-300 group-hover:translate-x-2"
                  >
                    Découvrir →
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
