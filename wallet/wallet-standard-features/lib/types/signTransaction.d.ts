import type { IdentifierString, WalletAccount } from '@wallet-standard/base';
/** Name of the feature. */
export declare const SolanaSignTransaction = "solana:signTransaction";
/** TODO: docs */
export declare type SolanaSignTransactionFeature = {
    /** Name of the feature. */
    readonly [SolanaSignTransaction]: {
        /** Version of the feature API. */
        readonly version: SolanaSignTransactionVersion;
        /** TODO: docs */
        readonly supportedTransactionVersions: readonly SolanaTransactionVersion[];
        /**
         * Sign transactions using the account's secret key.
         *
         * @param inputs Inputs for signing transactions.
         *
         * @return Outputs of signing transactions.
         */
        readonly signTransaction: SolanaSignTransactionMethod;
    };
};
/** TODO: docs */
export declare type SolanaSignTransactionVersion = '1.0.0';
/** TODO: docs */
export declare type SolanaTransactionVersion = 'legacy' | 0;
/** TODO: docs */
export declare type SolanaSignTransactionMethod = (...inputs: readonly SolanaSignTransactionInput[]) => Promise<readonly SolanaSignTransactionOutput[]>;
/** Input for signing a transaction. */
export interface SolanaSignTransactionInput {
    /** Account to use. */
    readonly account: WalletAccount;
    /** Serialized transaction, as raw bytes. */
    readonly transaction: Uint8Array;
    /** Chain to use. */
    readonly chain?: IdentifierString;
    /** TODO: docs */
    readonly options?: SolanaSignTransactionOptions;
}
/** Output of signing a transaction. */
export interface SolanaSignTransactionOutput {
    /**
     * Signed, serialized transaction, as raw bytes.
     * Returning a transaction rather than signatures allows multisig wallets, program wallets, and other wallets that
     * use meta-transactions to return a modified, signed transaction.
     */
    readonly signedTransaction: Uint8Array;
}
/** Options for signing a transaction. */
export declare type SolanaSignTransactionOptions = {
    /** Preflight commitment level. */
    readonly preflightCommitment?: SolanaTransactionCommitment;
    /** The minimum slot that the request can be evaluated at. */
    readonly minContextSlot?: number;
};
/** Commitment level for transactions. */
export declare type SolanaTransactionCommitment = 'processed' | 'confirmed' | 'finalized';
//# sourceMappingURL=signTransaction.d.ts.map