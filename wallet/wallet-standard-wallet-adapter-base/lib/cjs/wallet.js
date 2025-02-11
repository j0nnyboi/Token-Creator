"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _SolanaWalletAdapterWalletAccount_adapter, _SolanaWalletAdapterWallet_instances, _SolanaWalletAdapterWallet_listeners, _SolanaWalletAdapterWallet_adapter, _SolanaWalletAdapterWallet_supportedTransactionVersions, _SolanaWalletAdapterWallet_chain, _SolanaWalletAdapterWallet_endpoint, _SolanaWalletAdapterWallet_account, _SolanaWalletAdapterWallet_connected, _SolanaWalletAdapterWallet_disconnected, _SolanaWalletAdapterWallet_connect, _SolanaWalletAdapterWallet_disconnect, _SolanaWalletAdapterWallet_on, _SolanaWalletAdapterWallet_emit, _SolanaWalletAdapterWallet_off, _SolanaWalletAdapterWallet_deserializeTransaction, _SolanaWalletAdapterWallet_signAndSendTransaction, _SolanaWalletAdapterWallet_signTransaction, _SolanaWalletAdapterWallet_signMessage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerWalletAdapter = exports.SolanaWalletAdapterWallet = exports.SolanaWalletAdapterWalletAccount = void 0;
const wallet_adapter_base_1 = require("@j0nnyboi/wallet-adapter-base");
const wallet_standard_chains_1 = require("@j0nnyboi/wallet-standard-chains");
const wallet_standard_features_1 = require("@j0nnyboi/wallet-standard-features");
const wallet_standard_util_1 = require("@j0nnyboi/wallet-standard-util");
const web3_js_1 = require("@safecoin/web3.js");
const app_1 = require("@wallet-standard/app");
const features_1 = require("@wallet-standard/features");
const wallet_1 = require("@wallet-standard/wallet");
const bs58_1 = __importDefault(require("bs58"));
/** TODO: docs */
class SolanaWalletAdapterWalletAccount extends wallet_1.ReadonlyWalletAccount {
    constructor({ adapter, address, publicKey, chains, }) {
        const features = [wallet_standard_features_1.SolanaSignAndSendTransaction];
        if ('signTransaction' in adapter) {
            features.push(wallet_standard_features_1.SolanaSignTransaction);
        }
        if ('signMessage' in adapter) {
            features.push(wallet_standard_features_1.SolanaSignMessage);
        }
        super({ address, publicKey, chains, features });
        _SolanaWalletAdapterWalletAccount_adapter.set(this, void 0);
        if (new.target === SolanaWalletAdapterWalletAccount) {
            Object.freeze(this);
        }
        __classPrivateFieldSet(this, _SolanaWalletAdapterWalletAccount_adapter, adapter, "f");
    }
}
exports.SolanaWalletAdapterWalletAccount = SolanaWalletAdapterWalletAccount;
_SolanaWalletAdapterWalletAccount_adapter = new WeakMap();
/** TODO: docs */
class SolanaWalletAdapterWallet {
    constructor(adapter, chain, endpoint) {
        _SolanaWalletAdapterWallet_instances.add(this);
        _SolanaWalletAdapterWallet_listeners.set(this, {});
        _SolanaWalletAdapterWallet_adapter.set(this, void 0);
        _SolanaWalletAdapterWallet_supportedTransactionVersions.set(this, void 0);
        _SolanaWalletAdapterWallet_chain.set(this, void 0);
        _SolanaWalletAdapterWallet_endpoint.set(this, void 0);
        _SolanaWalletAdapterWallet_account.set(this, void 0);
        _SolanaWalletAdapterWallet_connect.set(this, ({ silent } = {}) => __awaiter(this, void 0, void 0, function* () {
            if (!silent && !__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").connected) {
                yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").connect();
            }
            __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_connected).call(this);
            return { accounts: this.accounts };
        }));
        _SolanaWalletAdapterWallet_disconnect.set(this, () => __awaiter(this, void 0, void 0, function* () {
            yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").disconnect();
        }));
        _SolanaWalletAdapterWallet_on.set(this, (event, listener) => {
            var _a;
            ((_a = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.push(listener)) || (__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_listeners, "f")[event] = [listener]);
            return () => __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_off).call(this, event, listener);
        });
        _SolanaWalletAdapterWallet_signAndSendTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const input = inputs[0];
                if (input.account !== __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f"))
                    throw new Error('invalid account');
                if (!(0, wallet_standard_chains_1.isSolanaChain)(input.chain))
                    throw new Error('invalid chain');
                const transaction = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_deserializeTransaction).call(this, input.transaction);
                const { commitment, preflightCommitment, skipPreflight, maxRetries, minContextSlot } = input.options || {};
                const endpoint = (0, wallet_standard_util_1.getEndpointForChain)(input.chain, __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_endpoint, "f"));
                const connection = new web3_js_1.Connection(endpoint, commitment || 'confirmed');
                const latestBlockhash = commitment
                    ? yield connection.getLatestBlockhash({
                        commitment: preflightCommitment || commitment,
                        minContextSlot,
                    })
                    : undefined;
                const signature = yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").sendTransaction(transaction, connection, {
                    preflightCommitment,
                    skipPreflight,
                    maxRetries,
                    minContextSlot,
                });
                if (latestBlockhash) {
                    yield connection.confirmTransaction(Object.assign(Object.assign({}, latestBlockhash), { signature }), commitment || 'confirmed');
                }
                outputs.push({ signature: bs58_1.default.decode(signature) });
            }
            else if (inputs.length > 1) {
                // Adapters have no `sendAllTransactions` method, so just sign and send each transaction in serial.
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_signAndSendTransaction, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        _SolanaWalletAdapterWallet_signTransaction.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!('signTransaction' in __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f")))
                throw new Error('signTransaction not implemented by adapter');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const input = inputs[0];
                if (input.account !== __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f"))
                    throw new Error('invalid account');
                if (input.chain && !(0, wallet_standard_chains_1.isSolanaChain)(input.chain))
                    throw new Error('invalid chain');
                const transaction = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_deserializeTransaction).call(this, input.transaction);
                const signedTransaction = yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").signTransaction(transaction);
                const serializedTransaction = (0, wallet_adapter_base_1.isVersionedTransaction)(signedTransaction)
                    ? signedTransaction.serialize()
                    : new Uint8Array(signedTransaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false,
                    }));
                outputs.push({ signedTransaction: serializedTransaction });
            }
            else if (inputs.length > 1) {
                for (const input of inputs) {
                    if (input.account !== __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f"))
                        throw new Error('invalid account');
                    if (input.chain && !(0, wallet_standard_chains_1.isSolanaChain)(input.chain))
                        throw new Error('invalid chain');
                }
                const transactions = inputs.map(({ transaction }) => __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_deserializeTransaction).call(this, transaction));
                const signedTransactions = yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").signAllTransactions(transactions);
                outputs.push(...signedTransactions.map((signedTransaction) => {
                    const serializedTransaction = (0, wallet_adapter_base_1.isVersionedTransaction)(signedTransaction)
                        ? signedTransaction.serialize()
                        : new Uint8Array(signedTransaction.serialize({
                            requireAllSignatures: false,
                            verifySignatures: false,
                        }));
                    return { signedTransaction: serializedTransaction };
                }));
            }
            return outputs;
        }));
        _SolanaWalletAdapterWallet_signMessage.set(this, (...inputs) => __awaiter(this, void 0, void 0, function* () {
            if (!('signMessage' in __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f")))
                throw new Error('signMessage not implemented by adapter');
            const outputs = [];
            if (inputs.length === 1) {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const input = inputs[0];
                if (input.account !== __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f"))
                    throw new Error('invalid account');
                const signature = yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").signMessage(input.message);
                outputs.push({ signedMessage: input.message, signature });
            }
            else if (inputs.length > 1) {
                // Adapters have no `signAllMessages` method, so just sign each message in serial.
                for (const input of inputs) {
                    outputs.push(...(yield __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_signMessage, "f").call(this, input)));
                }
            }
            return outputs;
        }));
        if (new.target === SolanaWalletAdapterWallet) {
            Object.freeze(this);
        }
        const supportedTransactionVersions = [...(adapter.supportedTransactionVersions || ['legacy'])];
        if (!supportedTransactionVersions.length) {
            supportedTransactionVersions.push('legacy');
        }
        __classPrivateFieldSet(this, _SolanaWalletAdapterWallet_adapter, adapter, "f");
        __classPrivateFieldSet(this, _SolanaWalletAdapterWallet_supportedTransactionVersions, supportedTransactionVersions, "f");
        __classPrivateFieldSet(this, _SolanaWalletAdapterWallet_chain, chain, "f");
        __classPrivateFieldSet(this, _SolanaWalletAdapterWallet_endpoint, endpoint, "f");
        adapter.on('connect', __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_connected), this);
        adapter.on('disconnect', __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_disconnected), this);
        __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_connected).call(this);
    }
    get version() {
        return '1.0.0';
    }
    get name() {
        return __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").name;
    }
    get icon() {
        return __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").icon;
    }
    get chains() {
        return [__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_chain, "f")];
    }
    get features() {
        const features = {
            [features_1.StandardConnect]: {
                version: '1.0.0',
                connect: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_connect, "f"),
            },
            [features_1.StandardDisconnect]: {
                version: '1.0.0',
                disconnect: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_disconnect, "f"),
            },
            [features_1.StandardEvents]: {
                version: '1.0.0',
                on: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_on, "f"),
            },
            [wallet_standard_features_1.SolanaSignAndSendTransaction]: {
                version: '1.0.0',
                supportedTransactionVersions: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_supportedTransactionVersions, "f"),
                signAndSendTransaction: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_signAndSendTransaction, "f"),
            },
        };
        let signTransactionFeature;
        if ('signTransaction' in __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f")) {
            signTransactionFeature = {
                [wallet_standard_features_1.SolanaSignTransaction]: {
                    version: '1.0.0',
                    supportedTransactionVersions: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_supportedTransactionVersions, "f"),
                    signTransaction: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_signTransaction, "f"),
                },
            };
        }
        let signMessageFeature;
        if ('signMessage' in __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f")) {
            signMessageFeature = {
                [wallet_standard_features_1.SolanaSignMessage]: {
                    version: '1.0.0',
                    signMessage: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_signMessage, "f"),
                },
            };
        }
        return Object.assign(Object.assign(Object.assign({}, features), signTransactionFeature), signMessageFeature);
    }
    get accounts() {
        return __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f") ? [__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f")] : [];
    }
    get endpoint() {
        return __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_endpoint, "f");
    }
    destroy() {
        __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").off('connect', __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_connected), this);
        __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").off('disconnect', __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_disconnected), this);
    }
}
exports.SolanaWalletAdapterWallet = SolanaWalletAdapterWallet;
_SolanaWalletAdapterWallet_listeners = new WeakMap(), _SolanaWalletAdapterWallet_adapter = new WeakMap(), _SolanaWalletAdapterWallet_supportedTransactionVersions = new WeakMap(), _SolanaWalletAdapterWallet_chain = new WeakMap(), _SolanaWalletAdapterWallet_endpoint = new WeakMap(), _SolanaWalletAdapterWallet_account = new WeakMap(), _SolanaWalletAdapterWallet_connect = new WeakMap(), _SolanaWalletAdapterWallet_disconnect = new WeakMap(), _SolanaWalletAdapterWallet_on = new WeakMap(), _SolanaWalletAdapterWallet_signAndSendTransaction = new WeakMap(), _SolanaWalletAdapterWallet_signTransaction = new WeakMap(), _SolanaWalletAdapterWallet_signMessage = new WeakMap(), _SolanaWalletAdapterWallet_instances = new WeakSet(), _SolanaWalletAdapterWallet_connected = function _SolanaWalletAdapterWallet_connected() {
    var _a;
    const publicKey = (_a = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").publicKey) === null || _a === void 0 ? void 0 : _a.toBytes();
    if (publicKey) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const address = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f").publicKey.toBase58();
        const account = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f");
        if (!account ||
            account.address !== address ||
            account.chains.includes(__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_chain, "f")) ||
            !(0, wallet_1.bytesEqual)(account.publicKey, publicKey)) {
            __classPrivateFieldSet(this, _SolanaWalletAdapterWallet_account, new SolanaWalletAdapterWalletAccount({
                adapter: __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_adapter, "f"),
                address,
                publicKey,
                chains: [__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_chain, "f")],
            }), "f");
            __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_emit).call(this, 'change', { accounts: this.accounts });
        }
    }
}, _SolanaWalletAdapterWallet_disconnected = function _SolanaWalletAdapterWallet_disconnected() {
    if (__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_account, "f")) {
        __classPrivateFieldSet(this, _SolanaWalletAdapterWallet_account, undefined, "f");
        __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_instances, "m", _SolanaWalletAdapterWallet_emit).call(this, 'change', { accounts: this.accounts });
    }
}, _SolanaWalletAdapterWallet_emit = function _SolanaWalletAdapterWallet_emit(event, ...args) {
    var _a;
    // eslint-disable-next-line prefer-spread
    (_a = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.forEach((listener) => listener.apply(null, args));
}, _SolanaWalletAdapterWallet_off = function _SolanaWalletAdapterWallet_off(event, listener) {
    var _a;
    __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_listeners, "f")[event] = (_a = __classPrivateFieldGet(this, _SolanaWalletAdapterWallet_listeners, "f")[event]) === null || _a === void 0 ? void 0 : _a.filter((existingListener) => listener !== existingListener);
}, _SolanaWalletAdapterWallet_deserializeTransaction = function _SolanaWalletAdapterWallet_deserializeTransaction(serializedTransaction) {
    const transaction = web3_js_1.VersionedTransaction.deserialize(serializedTransaction);
    if (!__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_supportedTransactionVersions, "f").includes(transaction.version))
        throw new Error('unsupported transaction version');
    if (transaction.version === 'legacy' && (0, wallet_1.arraysEqual)(__classPrivateFieldGet(this, _SolanaWalletAdapterWallet_supportedTransactionVersions, "f"), ['legacy']))
        return web3_js_1.Transaction.from(serializedTransaction);
    return transaction;
};
/** TODO: docs */
function registerWalletAdapter(adapter, chain, endpoint, match = (wallet) => wallet.name === adapter.name) {
    const { register, get, on } = (0, app_1.getWallets)();
    const destructors = [];
    function destroy() {
        destructors.forEach((destroy) => destroy());
        destructors.length = 0;
    }
    function setup() {
        // If the adapter is unsupported, or a standard wallet that matches it has already been registered, do nothing.
        if (adapter.readyState === wallet_adapter_base_1.WalletReadyState.Unsupported || get().some(match))
            return true;
        // If the adapter isn't ready, try again later.
        const ready = adapter.readyState === wallet_adapter_base_1.WalletReadyState.Installed || adapter.readyState === wallet_adapter_base_1.WalletReadyState.Loadable;
        if (ready) {
            const wallet = new SolanaWalletAdapterWallet(adapter, chain, endpoint);
            destructors.push(() => wallet.destroy());
            // Register the adapter wrapped as a standard wallet, and receive a function to unregister the adapter.
            destructors.push(register(wallet));
            // Whenever a standard wallet is registered ...
            destructors.push(on('register', (...wallets) => {
                // ... check if it matches the adapter.
                if (wallets.some(match)) {
                    // If it does, remove the event listener and unregister the adapter.
                    destroy();
                }
            }));
        }
        return ready;
    }
    if (!setup()) {
        function listener() {
            if (setup()) {
                adapter.off('readyStateChange', listener);
            }
        }
        adapter.on('readyStateChange', listener);
        destructors.push(() => adapter.off('readyStateChange', listener));
    }
    return destroy;
}
exports.registerWalletAdapter = registerWalletAdapter;
//# sourceMappingURL=wallet.js.map