import { WalletContextState } from "@solana/wallet-adapter-react";
import { PublicKey, Connection } from "@solana/web3.js";
import { StorageAccountResponse } from "@shadow-drive/sdk";
import { create } from "zustand";

interface AppState {
  // wallet
  wallet: WalletContextState | undefined;
  setWallet: (wallet: WalletContextState) => void;
  // Connection
  connection: Connection | undefined;
  setConnection: (connection: Connection) => void;
  // tx Sig
  txHash: string | undefined;
  setTxHash: (txHash: string) => void;
  // shadow storage account
  storageAccount: StorageAccountResponse | undefined;
  setStroageAccount: (
    account: StorageAccountResponse
  ) => void;
  // shadow storage accounts // TODO: Not required, save the only required account
  storageAccounts: StorageAccountResponse[] | undefined;
  setStroageAccounts: (
    account: StorageAccountResponse[]
  ) => void;
}

export const useAppState = create<AppState>((set) => ({
  // wallet
  wallet: undefined,
  setWallet: (wallet) => set(() => ({ wallet })),
  // connection
  connection: undefined,
  setConnection: (connection) =>
    set(() => ({ connection })),
  // tx Sig
  txHash: undefined,
  setTxHash: (txHash: string) => set(() => ({ txHash })),
  // shadow storage account
  storageAccount: undefined,
  setStroageAccount: (
    storageAccount: StorageAccountResponse
  ) => set({ storageAccount }),
  // shadow storage accounts // TODO: Not required, save the only required account
  storageAccounts: undefined,
  setStroageAccounts: (
    storageAccounts: StorageAccountResponse[]
  ) => set({ storageAccounts }),
}));
