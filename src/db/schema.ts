import {
  decimal,
  pgTable,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const ProductsTable = pgTable("products", {
  productHash: varchar("prd_hash", {
    length: 256,
  }).primaryKey(),
  productLink: varchar("prd_link", {
    length: 256,
  }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", {
    length: 256,
  }).notNull(),
  price: decimal("price"),
});

export type Product = InferModel<typeof ProductsTable>;
export type ProductNew = InferModel<
  typeof ProductsTable,
  "insert"
>;

export const UserTable = pgTable(
  "users",
  {
    walletAddress: varchar("wallet", {
      length: 256,
    }).notNull(),
    productHash: varchar("prd_hash", {
      length: 256,
    }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(
        table.productHash,
        table.walletAddress
      ),
    };
  }
);

export type User = InferModel<typeof UserTable>;
export type UserNew = InferModel<
  typeof UserTable,
  "insert"
>;
