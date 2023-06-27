import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MAINNET_CLUSTER = "mainnet-beta";
export const DEVNET_CLUSTER = "devnet";

export const MAINNET_RPC =
  process.env.NEXT_PUBLIC_RPC ??
  "https://api.mainnet-beta.solana.com";
export const DEVNET_RPC = "https://api.devnet.solana.com";

export const GUM_DEVNET_GRAPHQL =
  "https://light-pelican-32.hasura.app/v1/graphql";
export const GUM_MAINNET_GRAPHQL =
  "https://gum-core-main.hasura.app/v1/graphql";

/**
 * The files are stored at https://shdw-drive.genesysgo.net/{STORAGE_PDA}/{FILE_NAME}
 */
export const SHADOW_DRIVE_ENDPOINT =
  "https://shdw-drive.genesysgo.net/";
