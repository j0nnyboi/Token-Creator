import { SOLANA_DEVNET_CHAIN, SOLANA_LOCALNET_CHAIN, SOLANA_MAINNET_CHAIN, SOLANA_TESTNET_CHAIN, } from '@j0nnyboi/wallet-standard-chains';
export const MAINNET_ENDPOINT = 'https://api.mainnet-beta.safecoin.org';
export const DEVNET_ENDPOINT = 'https://api.devnet.safecoin.org';
export const TESTNET_ENDPOINT = 'https://api.testnet.safecoin.org';
export const LOCALNET_ENDPOINT = 'http://localhost:8899';
export function getChainForEndpoint(endpoint) {
    if (endpoint.includes(MAINNET_ENDPOINT))
        return SOLANA_MAINNET_CHAIN;
    if (/\bdevnet\b/i.test(endpoint))
        return SOLANA_DEVNET_CHAIN;
    if (/\btestnet\b/i.test(endpoint))
        return SOLANA_TESTNET_CHAIN;
    if (/\blocalhost\b/i.test(endpoint) || /\b127\.0\.0\.1\b/.test(endpoint))
        return SOLANA_LOCALNET_CHAIN;
    return SOLANA_MAINNET_CHAIN;
}
export function getEndpointForChain(chain, endpoint) {
    if (endpoint)
        return endpoint;
    if (chain === SOLANA_MAINNET_CHAIN)
        return MAINNET_ENDPOINT;
    if (chain === SOLANA_DEVNET_CHAIN)
        return DEVNET_ENDPOINT;
    if (chain === SOLANA_TESTNET_CHAIN)
        return TESTNET_ENDPOINT;
    if (chain === SOLANA_LOCALNET_CHAIN)
        return LOCALNET_ENDPOINT;
    return MAINNET_ENDPOINT;
}
//# sourceMappingURL=endpoint.js.map