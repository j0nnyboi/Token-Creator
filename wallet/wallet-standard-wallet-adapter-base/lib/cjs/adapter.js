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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _StandardWalletAdapter_instances, _StandardWalletAdapter_account, _StandardWalletAdapter_publicKey, _StandardWalletAdapter_connecting, _StandardWalletAdapter_disconnecting, _StandardWalletAdapter_off, _StandardWalletAdapter_wallet, _StandardWalletAdapter_supportedTransactionVersions, _StandardWalletAdapter_readyState, _StandardWalletAdapter_connected, _StandardWalletAdapter_disconnected, _StandardWalletAdapter_changed, _StandardWalletAdapter_signTransaction, _StandardWalletAdapter_signAllTransactions, _StandardWalletAdapter_signMessage;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardWalletAdapter = void 0;
const wallet_adapter_base_1 = require("@j0nnyboi/wallet-adapter-base");
const wallet_standard_features_1 = require("@j0nnyboi/wallet-standard-features");
const wallet_standard_util_1 = require("@j0nnyboi/wallet-standard-util");
const web3_js_1 = require("@safecoin/web3.js");
const features_1 = require("@wallet-standard/features");
const wallet_1 = require("@wallet-standard/wallet");
const bs58_1 = __importDefault(require("bs58"));
/** TODO: docs */
class StandardWalletAdapter extends wallet_adapter_base_1.BaseWalletAdapter {
    constructor({ wallet }) {
        super();
        _StandardWalletAdapter_instances.add(this);
        _StandardWalletAdapter_account.set(this, void 0);
        _StandardWalletAdapter_publicKey.set(this, void 0);
        _StandardWalletAdapter_connecting.set(this, void 0);
        _StandardWalletAdapter_disconnecting.set(this, void 0);
        _StandardWalletAdapter_off.set(this, void 0);
        _StandardWalletAdapter_wallet.set(this, void 0);
        _StandardWalletAdapter_supportedTransactionVersions.set(this, void 0);
        _StandardWalletAdapter_readyState.set(this, typeof window === 'undefined' || typeof document === 'undefined'
            ? wallet_adapter_base_1.WalletReadyState.Unsupported
            : wallet_adapter_base_1.WalletReadyState.Installed);
        _StandardWalletAdapter_changed.set(this, (properties) => {
            // If the adapter is disconnecting, or isn't connected, or the change doesn't include accounts, do nothing.
            if (__classPrivateFieldGet(this, _StandardWalletAdapter_disconnecting, "f") || !__classPrivateFieldGet(this, _StandardWalletAdapter_account, "f") || !__classPrivateFieldGet(this, _StandardWalletAdapter_publicKey, "f") || !('accounts' in properties))
                return;
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts[0];
            // If there's no connected account, disconnect the adapter.
            if (!account) {
                __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
                this.emit('error', new wallet_adapter_base_1.WalletDisconnectedError());
                this.emit('disconnect');
                return;
            }
            // If the account hasn't actually changed, do nothing.
            if (account === __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f"))
                return;
            let publicKey;
            // If the account public key isn't valid, disconnect the adapter.
            try {
                publicKey = new web3_js_1.PublicKey(account.publicKey);
            }
            catch (error) {
                __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
                this.emit('error', new wallet_adapter_base_1.WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message));
                this.emit('disconnect');
                return;
            }
            // Change the adapter's account and public key and emit an event.
            __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, account, publicKey);
            this.emit('connect', publicKey);
        });
        __classPrivateFieldSet(this, _StandardWalletAdapter_wallet, wallet, "f");
        const supportedTransactionVersions = wallet_standard_features_1.SolanaSignAndSendTransaction in wallet.features
            ? wallet.features[wallet_standard_features_1.SolanaSignAndSendTransaction].supportedTransactionVersions
            : wallet.features[wallet_standard_features_1.SolanaSignTransaction].supportedTransactionVersions;
        __classPrivateFieldSet(this, _StandardWalletAdapter_supportedTransactionVersions, (0, wallet_1.arraysEqual)(supportedTransactionVersions, ['legacy'])
            ? null
            : new Set(supportedTransactionVersions), "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_account, null, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_publicKey, null, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, false, "f");
        __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, false, "f");
    }
    get supportedTransactionVersions() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_supportedTransactionVersions, "f");
    }
    get name() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").name;
    }
    get icon() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").icon;
    }
    get url() {
        return 'https://github.com/solana-labs/wallet-standard';
    }
    get publicKey() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_publicKey, "f");
    }
    get connecting() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_connecting, "f");
    }
    get readyState() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_readyState, "f");
    }
    get wallet() {
        return __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f");
    }
    get standard() {
        return true;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.connected || this.connecting)
                    return;
                if (__classPrivateFieldGet(this, _StandardWalletAdapter_readyState, "f") !== wallet_adapter_base_1.WalletReadyState.Installed)
                    throw new wallet_adapter_base_1.WalletNotReadyError();
                __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, true, "f");
                if (!__classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts.length) {
                    try {
                        yield __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[features_1.StandardConnect].connect();
                    }
                    catch (error) {
                        throw new wallet_adapter_base_1.WalletConnectionError(error === null || error === void 0 ? void 0 : error.message, error);
                    }
                }
                if (!__classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts.length)
                    throw new wallet_adapter_base_1.WalletAccountError();
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const account = __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts[0];
                let publicKey;
                try {
                    publicKey = new web3_js_1.PublicKey(account.publicKey);
                }
                catch (error) {
                    throw new wallet_adapter_base_1.WalletPublicKeyError(error === null || error === void 0 ? void 0 : error.message, error);
                }
                __classPrivateFieldSet(this, _StandardWalletAdapter_off, __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[features_1.StandardEvents].on('change', __classPrivateFieldGet(this, _StandardWalletAdapter_changed, "f")), "f");
                __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, account, publicKey);
                this.emit('connect', publicKey);
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
            finally {
                __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, false, "f");
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            if (features_1.StandardDisconnect in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
                try {
                    __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, true, "f");
                    yield __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[features_1.StandardDisconnect].disconnect();
                }
                catch (error) {
                    this.emit('error', new wallet_adapter_base_1.WalletDisconnectionError(error === null || error === void 0 ? void 0 : error.message, error));
                }
                finally {
                    __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, false, "f");
                }
            }
            __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
            this.emit('disconnect');
        });
    }
    sendTransaction(transaction, connection, options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
                if (!account)
                    throw new wallet_adapter_base_1.WalletNotConnectedError();
                let feature;
                if (wallet_standard_features_1.SolanaSignAndSendTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
                    if (account.features.includes(wallet_standard_features_1.SolanaSignAndSendTransaction)) {
                        feature = wallet_standard_features_1.SolanaSignAndSendTransaction;
                    }
                    else if (wallet_standard_features_1.SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features &&
                        account.features.includes(wallet_standard_features_1.SolanaSignTransaction)) {
                        feature = wallet_standard_features_1.SolanaSignTransaction;
                    }
                    else {
                        throw new wallet_adapter_base_1.WalletAccountError();
                    }
                }
                else if (wallet_standard_features_1.SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
                    if (!account.features.includes(wallet_standard_features_1.SolanaSignTransaction))
                        throw new wallet_adapter_base_1.WalletAccountError();
                    feature = wallet_standard_features_1.SolanaSignTransaction;
                }
                else {
                    throw new wallet_adapter_base_1.WalletConfigError();
                }
                const chain = (0, wallet_standard_util_1.getChainForEndpoint)(connection.rpcEndpoint);
                if (!account.chains.includes(chain))
                    throw new wallet_adapter_base_1.WalletSendTransactionError();
                try {
                    const { signers } = options, sendOptions = __rest(options, ["signers"]);
                    let serializedTransaction;
                    if ((0, wallet_adapter_base_1.isVersionedTransaction)(transaction)) {
                        (signers === null || signers === void 0 ? void 0 : signers.length) && transaction.sign(signers);
                        serializedTransaction = transaction.serialize();
                    }
                    else {
                        transaction = (yield this.prepareTransaction(transaction, connection, sendOptions));
                        (signers === null || signers === void 0 ? void 0 : signers.length) && transaction.partialSign(...signers);
                        serializedTransaction = new Uint8Array(transaction.serialize({
                            requireAllSignatures: false,
                            verifySignatures: false,
                        }));
                    }
                    if (feature === wallet_standard_features_1.SolanaSignAndSendTransaction) {
                        const [output] = yield __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[wallet_standard_features_1.SolanaSignAndSendTransaction].signAndSendTransaction({
                            account,
                            chain,
                            transaction: serializedTransaction,
                            options: {
                                preflightCommitment: (0, wallet_standard_util_1.getCommitment)(sendOptions.preflightCommitment || connection.commitment),
                                skipPreflight: sendOptions.skipPreflight,
                                maxRetries: sendOptions.maxRetries,
                                minContextSlot: sendOptions.minContextSlot,
                            },
                        });
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        return bs58_1.default.encode(output.signature);
                    }
                    else {
                        const [output] = yield __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[wallet_standard_features_1.SolanaSignTransaction].signTransaction({
                            account,
                            chain,
                            transaction: serializedTransaction,
                            options: {
                                preflightCommitment: (0, wallet_standard_util_1.getCommitment)(sendOptions.preflightCommitment || connection.commitment),
                                minContextSlot: sendOptions.minContextSlot,
                            },
                        });
                        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                        return yield connection.sendRawTransaction(output.signedTransaction, Object.assign(Object.assign({}, sendOptions), { preflightCommitment: (0, wallet_standard_util_1.getCommitment)(sendOptions.preflightCommitment || connection.commitment) }));
                    }
                }
                catch (error) {
                    if (error instanceof wallet_adapter_base_1.WalletError)
                        throw error;
                    throw new wallet_adapter_base_1.WalletSendTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
                }
            }
            catch (error) {
                this.emit('error', error);
                throw error;
            }
        });
    }
}
exports.StandardWalletAdapter = StandardWalletAdapter;
_StandardWalletAdapter_account = new WeakMap(), _StandardWalletAdapter_publicKey = new WeakMap(), _StandardWalletAdapter_connecting = new WeakMap(), _StandardWalletAdapter_disconnecting = new WeakMap(), _StandardWalletAdapter_off = new WeakMap(), _StandardWalletAdapter_wallet = new WeakMap(), _StandardWalletAdapter_supportedTransactionVersions = new WeakMap(), _StandardWalletAdapter_readyState = new WeakMap(), _StandardWalletAdapter_changed = new WeakMap(), _StandardWalletAdapter_instances = new WeakSet(), _StandardWalletAdapter_connected = function _StandardWalletAdapter_connected(account, publicKey) {
    __classPrivateFieldSet(this, _StandardWalletAdapter_account, account, "f");
    __classPrivateFieldSet(this, _StandardWalletAdapter_publicKey, publicKey, "f");
    if (account === null || account === void 0 ? void 0 : account.features.includes(wallet_standard_features_1.SolanaSignTransaction)) {
        this.signTransaction = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signTransaction);
        this.signAllTransactions = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signAllTransactions);
    }
    else {
        delete this.signTransaction;
        delete this.signAllTransactions;
    }
    if (account === null || account === void 0 ? void 0 : account.features.includes(wallet_standard_features_1.SolanaSignMessage)) {
        this.signMessage = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signMessage);
    }
    else {
        delete this.signMessage;
    }
}, _StandardWalletAdapter_disconnected = function _StandardWalletAdapter_disconnected() {
    const off = __classPrivateFieldGet(this, _StandardWalletAdapter_off, "f");
    if (off) {
        __classPrivateFieldSet(this, _StandardWalletAdapter_off, undefined, "f");
        off();
    }
    __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, null, null);
}, _StandardWalletAdapter_signTransaction = function _StandardWalletAdapter_signTransaction(transaction) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
            if (!account)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            if (!(wallet_standard_features_1.SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features))
                throw new wallet_adapter_base_1.WalletConfigError();
            if (!account.features.includes(wallet_standard_features_1.SolanaSignTransaction))
                throw new wallet_adapter_base_1.WalletAccountError();
            try {
                const signedTransactions = yield __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[wallet_standard_features_1.SolanaSignTransaction].signTransaction({
                    account,
                    transaction: (0, wallet_adapter_base_1.isVersionedTransaction)(transaction)
                        ? transaction.serialize()
                        : new Uint8Array(transaction.serialize({
                            requireAllSignatures: false,
                            verifySignatures: false,
                        })),
                });
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const serializedTransaction = signedTransactions[0].signedTransaction;
                return ((0, wallet_adapter_base_1.isVersionedTransaction)(transaction)
                    ? web3_js_1.VersionedTransaction.deserialize(serializedTransaction)
                    : web3_js_1.Transaction.from(serializedTransaction));
            }
            catch (error) {
                if (error instanceof wallet_adapter_base_1.WalletError)
                    throw error;
                throw new wallet_adapter_base_1.WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    });
}, _StandardWalletAdapter_signAllTransactions = function _StandardWalletAdapter_signAllTransactions(transactions) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
            if (!account)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            if (!(wallet_standard_features_1.SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features))
                throw new wallet_adapter_base_1.WalletConfigError();
            if (!account.features.includes(wallet_standard_features_1.SolanaSignTransaction))
                throw new wallet_adapter_base_1.WalletSignTransactionError();
            try {
                const signedTransactions = yield __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[wallet_standard_features_1.SolanaSignTransaction].signTransaction(...transactions.map((transaction) => ({
                    account,
                    transaction: (0, wallet_adapter_base_1.isVersionedTransaction)(transaction)
                        ? transaction.serialize()
                        : new Uint8Array(transaction.serialize({
                            requireAllSignatures: false,
                            verifySignatures: false,
                        })),
                })));
                return transactions.map((transaction, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    const signedTransaction = signedTransactions[index].signedTransaction;
                    return ((0, wallet_adapter_base_1.isVersionedTransaction)(transaction)
                        ? web3_js_1.VersionedTransaction.deserialize(signedTransaction)
                        : web3_js_1.Transaction.from(signedTransaction));
                });
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignTransactionError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    });
}, _StandardWalletAdapter_signMessage = function _StandardWalletAdapter_signMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
            if (!account)
                throw new wallet_adapter_base_1.WalletNotConnectedError();
            if (!(wallet_standard_features_1.SolanaSignMessage in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features))
                throw new wallet_adapter_base_1.WalletConfigError();
            if (!account.features.includes(wallet_standard_features_1.SolanaSignMessage))
                throw new wallet_adapter_base_1.WalletSignMessageError();
            try {
                const signedMessages = yield __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[wallet_standard_features_1.SolanaSignMessage].signMessage({
                    account,
                    message,
                });
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                return signedMessages[0].signature;
            }
            catch (error) {
                throw new wallet_adapter_base_1.WalletSignMessageError(error === null || error === void 0 ? void 0 : error.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    });
};
//# sourceMappingURL=adapter.js.map