import { getCategories } from "@/app/services/categoryService"
import CategoriesClient from "./CategoriesClient";

export default async function PageCategories() {
  const categories = await getCategories();

  return <CategoriesClient categories={categories} />;
}

