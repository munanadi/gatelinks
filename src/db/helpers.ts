import { db } from "@/db";
import { products, user } from "@/db/schema";

export async function getAllProducts(): Promise<any> {
  const results = await db.select().from(products);

  // const results = await db
  //   .select({
  //     description: products.description,
  //     name: products.name,
  //     price: products.price,
  //     productLink: products.productLink,
  //     productHash: products.productHash,
  //   })
  //   .from(products);

  console.log({ results });

  return results;
}
