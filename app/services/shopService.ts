
import { Shop } from '@/app/models/Shop';
import fs from 'fs/promises';
import path from 'path';

const SHOPS_FILE_PATH = path.join(process.cwd(), 'data', 'shops.json');

async function readShopsFromFile(): Promise<Shop[]> {
  try {
    const data = await fs.readFile(SHOPS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as Shop[];
  } catch (error) {
    console.error('Failed to read shops from file:', error);
    // Return an empty array or re-throw, depending on desired error handling
    return [];
  }
}

export async function getShops(page?: number, limit?: number): Promise<{ shops: Shop[], total: number }> {
  const allShops = await readShopsFromFile();
  const total = allShops.length;

  if (page && limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const shops = allShops.slice(startIndex, endIndex);
    return { shops, total };
  }
  
  return { shops: allShops, total };
}

export async function getShopById(id: string): Promise<Shop | undefined> {
    const shops = await readShopsFromFile();
    return shops.find(p => p.id === id);
}
