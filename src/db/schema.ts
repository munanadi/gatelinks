import {
  boolean,
  date,
  decimal,
  pgTable,
  primaryKey,
  varchar,
} from "drizzle-orm/pg-core";
import { InferModel } from "drizzle-orm";

export const ProductsTable = pgTable("products", {
  productHash: varchar("hash", {
    length: 256,
  }).primaryKey(),
  productLink: varchar("link", {
    length: 256,
  }).notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", {
    length: 256,
  }).notNull(),
  price: decimal("price").default("0").notNull(),
  creatorWallet: varchar("creator_wallet", {
    length: 256,
  }).notNull(),
  createdDate: date("created_date")
    .default(new Date().toString())
    .notNull(),
});

export type Product = InferModel<typeof ProductsTable>;
export type NewProduct = InferModel<
  typeof ProductsTable,
  "insert"
>;

export const UsersTable = pgTable(
  "users",
  {
    wallet: varchar("wallet", {
      length: 256,
    }).notNull(),
    productHash: varchar("product_hash", {
      length: 256,
    }).notNull(),
    date: date("date")
      .default(new Date().toString())
      .notNull(),
    sold: boolean("sold").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey(table.productHash, table.wallet),
    };
  }
);

export type User = InferModel<typeof UsersTable>;
export type NewUser = InferModel<
  typeof UsersTable,
  "insert"
>;
