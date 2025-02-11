"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useStandardWalletAdapters = void 0;
const wallet_standard_wallet_adapter_base_1 = require("@j0nnyboi/wallet-standard-wallet-adapter-base");
const app_1 = require("@wallet-standard/app");
const react_1 = require("react");
function useStandardWalletAdapters(adapters) {
    const { get, on } = useConstant(() => (0, app_1.DEPRECATED_getWallets)());
    const [standardAdapters, setStandardAdapters] = (0, react_1.useState)(() => wrapWalletsWithAdapters(get()));
    const warnings = useConstant(() => new Set());
    (0, react_1.useEffect)(() => {
        const listeners = [
            on('register', (...wallets) => setStandardAdapters((standardAdapters) => [...standardAdapters, ...wrapWalletsWithAdapters(wallets)])),
            on('unregister', (...wallets) => setStandardAdapters((standardAdapters) => standardAdapters.filter((standardAdapter) => wallets.some((wallet) => wallet === standardAdapter.wallet)))),
        ];
        return () => listeners.forEach((destroy) => destroy());
    }, [on]);
    return (0, react_1.useMemo)(() => [
        ...standardAdapters,
        ...adapters.filter(({ name }) => {
            if (standardAdapters.some((standardAdapter) => standardAdapter.name === name)) {
                if (!warnings.has(name)) {
                    warnings.add(name);
                    console.warn(`${name} was registered as a Standard Wallet. The Wallet Adapter for ${name} can be removed from your app.`);
                }
                return false;
            }
            return true;
        }),
    ], [standardAdapters, adapters, warnings]);
}
exports.useStandardWalletAdapters = useStandardWalletAdapters;
function useConstant(fn) {
    const ref = (0, react_1.useRef)();
    if (!ref.current) {
        ref.current = { value: fn() };
    }
    return ref.current.value;
}
function wrapWalletsWithAdapters(wallets) {
    return wallets.filter(wallet_standard_wallet_adapter_base_1.isWalletAdapterCompatibleWallet).map((wallet) => new wallet_standard_wallet_adapter_base_1.StandardWalletAdapter({ wallet }));
}
//# sourceMappingURL=useStandardWalletAdapters.js.map