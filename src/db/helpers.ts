import { db } from "@/db";
import { Product, ProductsTable } from "@/db/schema";

export async function getAllProducts(): Promise<Product[]> {
  const results = await db.select().from(ProductsTable);

  return results;
}
