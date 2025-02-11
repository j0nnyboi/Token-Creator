/// <reference types="react" />
import { type Adapter, type MessageSignerWalletAdapterProps, type SignerWalletAdapterProps, type WalletAdapterProps, type WalletName, type WalletReadyState } from '@solana/wallet-adapter-base';
import { type PublicKey } from '@solana/web3.js';
export interface Wallet {
    adapter: Adapter;
    readyState: WalletReadyState;
}
export interface WalletContextState {
    autoConnect: boolean;
    wallets: Wallet[];
    wallet: Wallet | null;
    publicKey: PublicKey | null;
    connecting: boolean;
    connected: boolean;
    disconnecting: boolean;
    select(walletName: WalletName | null): void;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction: WalletAdapterProps['sendTransaction'];
    signTransaction: SignerWalletAdapterProps['signTransaction'] | undefined;
    signAllTransactions: SignerWalletAdapterProps['signAllTransactions'] | undefined;
    signMessage: MessageSignerWalletAdapterProps['signMessage'] | undefined;
}
export declare const WalletContext: import("react").Context<WalletContextState>;
export declare function useWallet(): WalletContextState;
//# sourceMappingURL=useWallet.d.ts.map