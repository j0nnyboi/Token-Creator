import { BaseWalletAdapter, type SendTransactionOptions, type StandardWalletAdapter as StandardWalletAdapterType, type SupportedTransactionVersions, type WalletAdapterCompatibleStandardWallet, type WalletName, WalletReadyState } from '@j0nnyboi/wallet-adapter-base';
import type { Connection, TransactionSignature } from '@safecoin/web3.js';
import { PublicKey, Transaction, VersionedTransaction } from '@safecoin/web3.js';
/** TODO: docs */
export interface StandardWalletAdapterConfig {
    wallet: WalletAdapterCompatibleStandardWallet;
}
/** TODO: docs */
export declare class StandardWalletAdapter extends BaseWalletAdapter implements StandardWalletAdapterType {
    #private;
    get supportedTransactionVersions(): SupportedTransactionVersions;
    get name(): WalletName<string>;
    get icon(): `data:image/svg+xml;base64,${string}` | `data:image/webp;base64,${string}` | `data:image/png;base64,${string}` | `data:image/gif;base64,${string}`;
    get url(): string;
    get publicKey(): PublicKey | null;
    get connecting(): boolean;
    get readyState(): WalletReadyState;
    get wallet(): WalletAdapterCompatibleStandardWallet;
    get standard(): true;
    constructor({ wallet }: StandardWalletAdapterConfig);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    sendTransaction<T extends Transaction | VersionedTransaction>(transaction: T, connection: Connection, options?: SendTransactionOptions): Promise<TransactionSignature>;
    signTransaction: (<T extends Transaction | VersionedTransaction>(transaction: T) => Promise<T>) | undefined;
    signAllTransactions: (<T extends Transaction | VersionedTransaction>(transaction: T[]) => Promise<T[]>) | undefined;
    signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}
//# sourceMappingURL=adapter.d.ts.map