import { Produit } from '@/app/models/Produit';
import fs from 'fs/promises';
import path from 'path';

const PRODUCTS_FILE_PATH = path.join(process.cwd(), 'data', 'products.json');

async function readProductsFromFile(): Promise<Produit[]> {
  try {
    const data = await fs.readFile(PRODUCTS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Produit[];
  } catch (error) {
    console.error('Failed to read products from file:', error);
    return [];
  }
}

export async function getProducts(): Promise<Produit[]> {
  const products = await readProductsFromFile();
  return products;
}

export async function getProductById(id: string): Promise<Produit | undefined> {
    const products = await readProductsFromFile();
    return products.find(p => p.id === id);
}

export async function getTrendingProducts(): Promise<Produit[]> {
    const products = await readProductsFromFile();
    return products.filter(p => p.isTrending);
}

export async function getNewProducts(page?: number, limit?: number): Promise<{ products: Produit[], total: number }> {
    const allProducts = await readProductsFromFile();
    const newProducts = allProducts.filter(p => p.isNew);
    const total = newProducts.length;

    if (page && limit) {
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const products = newProducts.slice(startIndex, endIndex);
        return { products, total };
    }
    
    return { products: newProducts, total };
}

export async function getProductsByCategory(categoryId: string): Promise<Produit[]> {
    const products = await readProductsFromFile();
    return products.filter(p => p.categoryId === categoryId);
}

export async function getProductsByShopId(shopId: string): Promise<Produit[]> {
    const products = await readProductsFromFile();
    return products.filter(p => p.shopId === shopId);
}

export async function getHardcodedProducts(): Promise<Produit[]> {
    return await readProductsFromFile();
}