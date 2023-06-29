# Gatelinks

A gumroad alternative that is crypto native. Check it out [here](https://gatelinks-ten.vercel.app/)

1. Candypay for checkouts
2. Shadow Drive for storage
3. ~~Planetscale DB to store products and purchases.~~ Vercel Postgres.
4. TODO: PDAs to store Products

---

### Dev setup

1. Get keys from [Candypay](https://candypay.fun/app) and add in .env
2. Get a RPC from [Helius](https://www.helius.xyz/) and add in .env
3. Get a DB URL from [PlanetScale](https://app.planetscale.com/) and add in .env
4. Shadow drive works only on Mainnet for now. [Get SHDW tokens from Jupiter](https://jup.ag/swap/USDC-SHDW)

---

> Skipping planetscale for now cause of dep errors.
5. Setup Planetscale and Drizzle Migrations
  1. Create planetscale DB
  2. Run these `migrations:generate` and `migrations:push` to get the schema and create DBs

---

5. Vercel postgres.

```sql
CREATE TABLE IF NOT EXISTS products (
	prd_hash varchar(256) PRIMARY KEY NOT NULL,
	prd_link varchar(256) NOT NULL,
	name varchar(256) NOT NULL,
	description varchar(256) NOT NULL,
	price decimal);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS users (
	wallet varchar(256) NOT NULL,
	prd_hash varchar(256) NOT NULL,
	PRIMARY KEY(wallet, prd_hash));
```