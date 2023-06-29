import { db } from "@/db";
import {
  NewProduct,
  NewUser,
  Product,
  ProductsTable,
  User,
  UserTable,
} from "@/db/schema";

export async function getAllProducts(): Promise<Product[]> {
  return await db.select().from(ProductsTable);
}

export async function getAllUsers(): Promise<User[]> {
  return await db.select().from(UserTable);
}

export async function insertProduct(product: NewProduct) {
  return db.insert(ProductsTable).values(product);
}

export async function insertUser(user: NewUser) {
  return db.insert(UserTable).values(user);
}
