import {
    isWalletAdapterCompatibleStandardWallet,
    type StandardWalletAdapter,
    type WalletAdapterCompatibleStandardWallet,
} from '@j0nnyboi/wallet-adapter-base';

/**
 * @deprecated Use `StandardWalletAdapter` from `@j0nnyboi/wallet-adapter-base` instead.
 *
 * @group Deprecated
 */
export type StandardAdapter = StandardWalletAdapter;

/**
 * @deprecated Use `WalletAdapterCompatibleStandardWallet` from `@j0nnyboi/wallet-adapter-base` instead.
 *
 * @group Deprecated
 */
export type WalletAdapterCompatibleWallet = WalletAdapterCompatibleStandardWallet;

/**
 * @deprecated Use `isWalletAdapterCompatibleStandardWallet` from `@j0nnyboi/wallet-adapter-base` instead.
 *
 * @group Deprecated
 */
export const isWalletAdapterCompatibleWallet = isWalletAdapterCompatibleStandardWallet;
