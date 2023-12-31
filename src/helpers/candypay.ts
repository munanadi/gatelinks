import { CandyPay } from "@candypay/checkout-sdk";

export const candypay = new CandyPay({
  api_keys: {
    private_api_key: process.env.CANDYPAY_PRIVATE_API_KEY!,
    public_api_key: process.env.CANDYPAY_PUBLIC_API_KEY!,
  },
  network:
    process.env.NODE_ENV === "production"
      ? "mainnet"
      : "mainnet",
  config: {
    collect_shipping_address: false,
  },
});
