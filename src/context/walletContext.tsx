"use client";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { BackpackWalletAdapter } from "@solana/wallet-adapter-backpack";
import { clusterApiUrl } from "@solana/web3.js";
import type { FC } from "react";
import React, { useMemo } from "react";

// Default styles that can be overridden by your app
require("@solana/wallet-adapter-react-ui/styles.css");

type Props = {
  children?: React.ReactNode;
};
export const WalletWrapper: FC<Props> = ({
  children,
}: Props) => {
  const network = WalletAdapterNetwork.Mainnet;

  const endpoint = useMemo(
    // () => clusterApiUrl(network),
    () => {
      return (
        process.env.NEXT_PUBLIC_RPC ??
        `https://api.mainnet-beta.solana.com`
      ); // For mainnet
    },
    [network]
  );

  const wallets = useMemo(
    () => [
      // new BackpackWalletAdapter(),
      // new PhantomWalletAdapter(),
      // new SolflareWalletAdapter({ network }),
      // new GlowWalletAdapter(),
      // new LedgerWalletAdapter(),
      // new SolletWalletAdapter({ network }),
      // new SlopeWalletAdapter(),
      // new SolletExtensionWalletAdapter({ network }),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
