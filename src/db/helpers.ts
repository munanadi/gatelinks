import { db } from "@/db";
import {
  NewProduct,
  NewUser,
  Product,
  ProductsTable,
  User,
  UsersTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getAllProducts(): Promise<Product[]> {
  return await db.select().from(ProductsTable);
}

export async function getOwnedProducts(
  walletAddress: string
) {
  return await db
    .select()
    .from(ProductsTable)
    .where(eq(ProductsTable.creatorWallet, walletAddress));
}

export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(UsersTable);
}

export async function insertProduct(product: NewProduct) {
  return db.insert(ProductsTable).values(product);
}

export async function insertUser(user: NewUser) {
  return db.insert(UsersTable).values(user);
}
