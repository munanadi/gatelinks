import {
  decimal,
  mysqlTable,
  primaryKey,
  varchar,
} from "drizzle-orm/mysql-core";

export const products = mysqlTable("products", {
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

export const user = mysqlTable(
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
