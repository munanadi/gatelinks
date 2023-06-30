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

export async function getProductDetails(
  productId: string
): Promise<Product[]> {
  return await db
    .select()
    .from(ProductsTable)
    .where(eq(ProductsTable.productHash, productId));
}

export async function getNumberOfProductsSold(
  walletAddress: string
): Promise<number> {
  const rows = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.wallet, walletAddress));
  const numberOfPorductsSold = rows.filter(
    (prd) => prd.sold
  ).length;
  return numberOfPorductsSold;
}

export async function getTotalRevenue(
  walletAddress: string
): Promise<number> {
  const allBoughtProducts = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.sold, false));

  const cummBoughtProducts: {
    [productHash: string]: number;
  } = {};

  allBoughtProducts.forEach((prd) => {
    if (cummBoughtProducts[prd.productHash]) {
      cummBoughtProducts[prd.productHash] += 1;
    } else {
      cummBoughtProducts[prd.productHash] = 1;
    }
  });

  const allCreatedProduct = await db
    .select()
    .from(ProductsTable)
    .where(eq(ProductsTable.creatorWallet, walletAddress));

  const priceOfProdcuts: {
    [productHash: string]: string;
  } = {};

  allCreatedProduct.forEach((prd) => {
    priceOfProdcuts[prd.productHash] = prd.price;
  });

  let totalRevenue = 0;

  for (let [prdHash, numberSold] of Object.entries(
    cummBoughtProducts
  )) {
    if (priceOfProdcuts[prdHash]) {
      totalRevenue +=
        numberSold * parseFloat(priceOfProdcuts[prdHash]);
    }
  }

  return totalRevenue;
}

export async function getOwnedProducts(
  walletAddress: string
) {
  return await db
    .select()
    .from(ProductsTable)
    .where(eq(ProductsTable.creatorWallet, walletAddress));
}

export async function getAllPurchases(
  walletAddress: string
) {
  return await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.wallet, walletAddress))
    .where(eq(UsersTable.sold, false));
}

export async function checkPurchase(
  walletAddress: string,
  productHash: string
) {
  return await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.wallet, walletAddress))
    .where(eq(UsersTable.sold, false))
    .where(eq(UsersTable.productHash, productHash));
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
