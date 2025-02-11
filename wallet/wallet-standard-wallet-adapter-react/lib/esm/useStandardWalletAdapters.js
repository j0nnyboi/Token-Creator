import { isWalletAdapterCompatibleWallet, StandardWalletAdapter } from '@j0nnyboi/wallet-standard-wallet-adapter-base';
import { DEPRECATED_getWallets } from '@wallet-standard/app';
import { useEffect, useMemo, useRef, useState } from 'react';
export function useStandardWalletAdapters(adapters) {
    const { get, on } = useConstant(() => DEPRECATED_getWallets());
    const [standardAdapters, setStandardAdapters] = useState(() => wrapWalletsWithAdapters(get()));
    const warnings = useConstant(() => new Set());
    useEffect(() => {
        const listeners = [
            on('register', (...wallets) => setStandardAdapters((standardAdapters) => [...standardAdapters, ...wrapWalletsWithAdapters(wallets)])),
            on('unregister', (...wallets) => setStandardAdapters((standardAdapters) => standardAdapters.filter((standardAdapter) => wallets.some((wallet) => wallet === standardAdapter.wallet)))),
        ];
        return () => listeners.forEach((destroy) => destroy());
    }, [on]);
    return useMemo(() => [
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
function useConstant(fn) {
    const ref = useRef();
    if (!ref.current) {
        ref.current = { value: fn() };
    }
    return ref.current.value;
}
function wrapWalletsWithAdapters(wallets) {
    return wallets.filter(isWalletAdapterCompatibleWallet).map((wallet) => new StandardWalletAdapter({ wallet }));
}
//# sourceMappingURL=useStandardWalletAdapters.js.map