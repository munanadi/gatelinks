# Gatelinks

A Solana-native Gumorad alternative. Check it out [here](https://gatelinks-ten.vercel.app/)

1. Next.js 13
2. [Candypay](https://candypay.fun/app) for checkouts
3. [Shadow](https://www.shadow.storage/) Drive for storage
4. [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
5. [shadcn/ui](https://ui.shadcn.com/) for UI components

## Demo



https://github.com/munanadi/gatelinks/assets/22261173/2cf7677e-fe1f-4cfa-93ff-be53a668e28d



---

TODOs:

- [ ] PDAs to store Products instead of Vercel Postgres.
- [ ] Helius to index them later.

---

### Dev setup

1. Get keys from [Candypay](https://candypay.fun/app) and add in .env
2. Get a RPC from [Helius](https://www.helius.xyz/) and add in .env
3. Shadow drive works only on Mainnet for now. [Get SHDW tokens from Jupiter](https://jup.ag/swap/USDC-SHDW)
4. Setup Vercel postgres storage from dashboard of vercel
5. Run `yarn run migrations:generate` will get you the below SQL commands. Run this in the console of vercel storage dashborad to setup DB

```sql
CREATE TABLE IF NOT EXISTS "products" (
	"hash" varchar(256) PRIMARY KEY NOT NULL,
	"link" varchar(256) NOT NULL,
	"name" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	"price" numeric DEFAULT '0' NOT NULL,
	"creator_wallet" varchar(256) NOT NULL,
	"created_date" date DEFAULT CURRENT_DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS "users" (
	"wallet" varchar(256) NOT NULL,
	"product_hash" varchar(256) NOT NULL,
	"date" date DEFAULT CURRENT_DATE NOT NULL,
	"sold" boolean NOT NULL
);

ALTER TABLE "users" ADD CONSTRAINT "users_product_hash_wallet" PRIMARY KEY("product_hash","wallet");
```
