"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEndpointForChain = exports.getChainForEndpoint = exports.LOCALNET_ENDPOINT = exports.TESTNET_ENDPOINT = exports.DEVNET_ENDPOINT = exports.MAINNET_ENDPOINT = void 0;
const wallet_standard_chains_1 = require("@j0nnyboi/wallet-standard-chains");
exports.MAINNET_ENDPOINT = 'https://api.mainnet-beta.safecoin.org';
exports.DEVNET_ENDPOINT = 'https://api.devnet.safecoin.org';
exports.TESTNET_ENDPOINT = 'https://api.testnet.safecoin.org';
exports.LOCALNET_ENDPOINT = 'http://localhost:8899';
function getChainForEndpoint(endpoint) {
    if (endpoint.includes(exports.MAINNET_ENDPOINT))
        return wallet_standard_chains_1.SOLANA_MAINNET_CHAIN;
    if (/\bdevnet\b/i.test(endpoint))
        return wallet_standard_chains_1.SOLANA_DEVNET_CHAIN;
    if (/\btestnet\b/i.test(endpoint))
        return wallet_standard_chains_1.SOLANA_TESTNET_CHAIN;
    if (/\blocalhost\b/i.test(endpoint) || /\b127\.0\.0\.1\b/.test(endpoint))
        return wallet_standard_chains_1.SOLANA_LOCALNET_CHAIN;
    return wallet_standard_chains_1.SOLANA_MAINNET_CHAIN;
}
exports.getChainForEndpoint = getChainForEndpoint;
function getEndpointForChain(chain, endpoint) {
    if (endpoint)
        return endpoint;
    if (chain === wallet_standard_chains_1.SOLANA_MAINNET_CHAIN)
        return exports.MAINNET_ENDPOINT;
    if (chain === wallet_standard_chains_1.SOLANA_DEVNET_CHAIN)
        return exports.DEVNET_ENDPOINT;
    if (chain === wallet_standard_chains_1.SOLANA_TESTNET_CHAIN)
        return exports.TESTNET_ENDPOINT;
    if (chain === wallet_standard_chains_1.SOLANA_LOCALNET_CHAIN)
        return exports.LOCALNET_ENDPOINT;
    return exports.MAINNET_ENDPOINT;
}
exports.getEndpointForChain = getEndpointForChain;
//# sourceMappingURL=endpoint.js.map