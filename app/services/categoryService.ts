import { Category } from '@/app/models/Category';
import fs from 'fs/promises';
import path from 'path';

const CATEGORIES_FILE_PATH = path.join(process.cwd(), 'data', 'categories.json');

async function readCategoriesFromFile(): Promise<Category[]> {
  try {
    const data = await fs.readFile(CATEGORIES_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Category[];
  } catch (error) {
    console.error('Failed to read categories from file:', error);
    return [];
  }
}

export async function getCategories(): Promise<Category[]> {
  const categories = await readCategoriesFromFile();
  return categories;
}

export async function getCategoryById(id: string): Promise<Category | undefined> {
    const categories = await readCategoriesFromFile();
    return categories.find(c => c.id === id);
}