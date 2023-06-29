CREATE TABLE IF NOT EXISTS "products" (
	"prd_hash" varchar(256) PRIMARY KEY NOT NULL,
	"prd_link" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"price" numeric,
	"seller_wallet" varchar(256)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"wallet" varchar(256) NOT NULL,
	"prd_hash" varchar(256) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_prd_hash_wallet" PRIMARY KEY("prd_hash","wallet");
