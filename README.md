# Gatelinks

A gumroad alternative that is crypto native.

1. Candypay for checkouts
2. Shadow Drive for storage
3. Planetscale DB to store products and purchases.
4. TODO: PDAs to store Products

---

### Dev setup

1. Get keys from [Candypay](https://candypay.fun/app) and add in .env
2. Get a RPC from [Helius](https://www.helius.xyz/) and add in .env
3. Get a DB URL from [PlanetScale](https://app.planetscale.com/) and add in .env
4. Shadow drive works only on Mainnet for now. [Get SHDW tokens from Jupiter](https://jup.ag/swap/USDC-SHDW)
5. Setup Planetscale and Drizzle Migrations
  1. Create planetscale DB
  2. Run these `migrations:generate` and `migrations:push` to get the schema and create DBs