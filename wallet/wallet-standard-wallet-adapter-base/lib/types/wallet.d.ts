import { type Adapter } from '@j0nnyboi/wallet-adapter-base';
import { type SolanaChain } from '@j0nnyboi/wallet-standard-chains';
import { type SolanaSignAndSendTransactionFeature, type SolanaSignMessageFeature, type SolanaSignTransactionFeature } from '@j0nnyboi/wallet-standard-features';
import type { Wallet } from '@wallet-standard/base';
import { type StandardConnectFeature, type StandardDisconnectFeature } from '@wallet-standard/features';
import { ReadonlyWalletAccount } from '@wallet-standard/wallet';
/** TODO: docs */
export declare class SolanaWalletAdapterWalletAccount extends ReadonlyWalletAccount {
    #private;
    constructor({ adapter, address, publicKey, chains, }: {
        adapter: Adapter;
        address: string;
        publicKey: Uint8Array;
        chains: readonly SolanaChain[];
    });
}
/** TODO: docs */
export declare class SolanaWalletAdapterWallet implements Wallet {
    #private;
    get version(): "1.0.0";
    get name(): import("@solana/wallet-adapter-base").WalletName<string>;
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get chains(): ("solana:mainnet" | "solana:devnet" | "solana:testnet" | "solana:localnet")[];
    get features(): StandardConnectFeature & StandardDisconnectFeature & SolanaSignAndSendTransactionFeature & Partial<SolanaSignTransactionFeature & SolanaSignMessageFeature>;
    get accounts(): SolanaWalletAdapterWalletAccount[];
    get endpoint(): string | undefined;
    constructor(adapter: Adapter, chain: SolanaChain, endpoint?: string);
    destroy(): void;
}
/** TODO: docs */
export declare function registerWalletAdapter(adapter: Adapter, chain: SolanaChain, endpoint?: string, match?: (wallet: Wallet) => boolean): () => void;
//# sourceMappingURL=wallet.d.ts.map