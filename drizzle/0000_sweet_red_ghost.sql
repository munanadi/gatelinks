CREATE TABLE IF NOT EXISTS "products" (
	"hash" varchar(256) PRIMARY KEY NOT NULL,
	"link" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"price" numeric DEFAULT '0' NOT NULL,
	"creator_wallet" varchar(256) NOT NULL,
	"created_date" date DEFAULT 'Fri Jun 30 2023 14:30:20 GMT+0530 (India Standard Time)' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"wallet" varchar(256) NOT NULL,
	"product_hash" varchar(256) NOT NULL,
	"date" date DEFAULT 'Fri Jun 30 2023 14:30:20 GMT+0530 (India Standard Time)' NOT NULL,
	"sold" boolean NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_product_hash_wallet" PRIMARY KEY("product_hash","wallet");
