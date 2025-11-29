"use client"
import Link from "next/link"
import { useState } from "react"

export function ProductHeader() {
  const [searchValue, setSearchValue] = useState("")

  return (
    <header className="bg-background-light dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between whitespace-nowrap border-b border-solid border-gray-200 dark:border-gray-700 py-3">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="material-symbols-outlined text-primary text-3xl">shopping_bag</span>
              <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">Centre Commercial</h2>
            </Link>
            <nav className="hidden lg:flex items-center gap-6">
              <Link className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="/produits?categorie=mode">Mode</Link>
              <Link className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="/produits?categorie=electronique">Électronique</Link>
              <Link className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="/produits?categorie=maison">Maison</Link>
              <Link className="text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary" href="/produits?categorie=beaute">Beauté</Link>
            </nav>
          </div>
          <div className="flex flex-1 justify-end items-center gap-4">
            <div className="hidden md:flex flex-1 max-w-sm">
              <label className="flex flex-col w-full !h-10">
                <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                  <div className="text-gray-500 dark:text-gray-400 flex border-none bg-gray-100 dark:bg-gray-800 items-center justify-center pl-3 rounded-l-lg border-r-0">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border-none bg-gray-100 dark:bg-gray-800 focus:border-none h-full placeholder:text-gray-500 dark:placeholder:text-gray-400 px-4 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal"
                    placeholder="Rechercher un produit..."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </div>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <Link href="/panier" className="relative flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">shopping_cart</span>
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-white text-xs font-bold">3</span>
              </Link>
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">person</span>
              </button>
              <button className="lg:hidden flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 w-10 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700">
                <span className="material-symbols-outlined">menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
