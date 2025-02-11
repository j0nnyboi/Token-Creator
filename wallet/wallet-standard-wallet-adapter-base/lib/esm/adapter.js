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
var _StandardWalletAdapter_instances, _StandardWalletAdapter_account, _StandardWalletAdapter_publicKey, _StandardWalletAdapter_connecting, _StandardWalletAdapter_disconnecting, _StandardWalletAdapter_off, _StandardWalletAdapter_wallet, _StandardWalletAdapter_supportedTransactionVersions, _StandardWalletAdapter_readyState, _StandardWalletAdapter_connected, _StandardWalletAdapter_disconnected, _StandardWalletAdapter_changed, _StandardWalletAdapter_signTransaction, _StandardWalletAdapter_signAllTransactions, _StandardWalletAdapter_signMessage;
import { BaseWalletAdapter, isVersionedTransaction, WalletAccountError, WalletConfigError, WalletConnectionError, WalletDisconnectedError, WalletDisconnectionError, WalletError, WalletNotConnectedError, WalletNotReadyError, WalletPublicKeyError, WalletReadyState, WalletSendTransactionError, WalletSignMessageError, WalletSignTransactionError, } from '@j0nnyboi/wallet-adapter-base';
import { SolanaSignAndSendTransaction, SolanaSignMessage, SolanaSignTransaction, } from '@j0nnyboi/wallet-standard-features';
import { getChainForEndpoint, getCommitment } from '@j0nnyboi/wallet-standard-util';
import { PublicKey, Transaction, VersionedTransaction } from '@safecoin/web3.js';
import { StandardConnect, StandardDisconnect, StandardEvents, } from '@wallet-standard/features';
import { arraysEqual } from '@wallet-standard/wallet';
import bs58 from 'bs58';
/** TODO: docs */
export class StandardWalletAdapter extends BaseWalletAdapter {
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
            ? WalletReadyState.Unsupported
            : WalletReadyState.Installed);
        _StandardWalletAdapter_changed.set(this, (properties) => {
            // If the adapter is disconnecting, or isn't connected, or the change doesn't include accounts, do nothing.
            if (__classPrivateFieldGet(this, _StandardWalletAdapter_disconnecting, "f") || !__classPrivateFieldGet(this, _StandardWalletAdapter_account, "f") || !__classPrivateFieldGet(this, _StandardWalletAdapter_publicKey, "f") || !('accounts' in properties))
                return;
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts[0];
            // If there's no connected account, disconnect the adapter.
            if (!account) {
                __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
                this.emit('error', new WalletDisconnectedError());
                this.emit('disconnect');
                return;
            }
            // If the account hasn't actually changed, do nothing.
            if (account === __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f"))
                return;
            let publicKey;
            // If the account public key isn't valid, disconnect the adapter.
            try {
                publicKey = new PublicKey(account.publicKey);
            }
            catch (error) {
                __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
                this.emit('error', new WalletPublicKeyError(error?.message));
                this.emit('disconnect');
                return;
            }
            // Change the adapter's account and public key and emit an event.
            __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_connected).call(this, account, publicKey);
            this.emit('connect', publicKey);
        });
        __classPrivateFieldSet(this, _StandardWalletAdapter_wallet, wallet, "f");
        const supportedTransactionVersions = SolanaSignAndSendTransaction in wallet.features
            ? wallet.features[SolanaSignAndSendTransaction].supportedTransactionVersions
            : wallet.features[SolanaSignTransaction].supportedTransactionVersions;
        __classPrivateFieldSet(this, _StandardWalletAdapter_supportedTransactionVersions, arraysEqual(supportedTransactionVersions, ['legacy'])
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
    async connect() {
        try {
            if (this.connected || this.connecting)
                return;
            if (__classPrivateFieldGet(this, _StandardWalletAdapter_readyState, "f") !== WalletReadyState.Installed)
                throw new WalletNotReadyError();
            __classPrivateFieldSet(this, _StandardWalletAdapter_connecting, true, "f");
            if (!__classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts.length) {
                try {
                    await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[StandardConnect].connect();
                }
                catch (error) {
                    throw new WalletConnectionError(error?.message, error);
                }
            }
            if (!__classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts.length)
                throw new WalletAccountError();
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").accounts[0];
            let publicKey;
            try {
                publicKey = new PublicKey(account.publicKey);
            }
            catch (error) {
                throw new WalletPublicKeyError(error?.message, error);
            }
            __classPrivateFieldSet(this, _StandardWalletAdapter_off, __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[StandardEvents].on('change', __classPrivateFieldGet(this, _StandardWalletAdapter_changed, "f")), "f");
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
    }
    async disconnect() {
        if (StandardDisconnect in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
            try {
                __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, true, "f");
                await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[StandardDisconnect].disconnect();
            }
            catch (error) {
                this.emit('error', new WalletDisconnectionError(error?.message, error));
            }
            finally {
                __classPrivateFieldSet(this, _StandardWalletAdapter_disconnecting, false, "f");
            }
        }
        __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_disconnected).call(this);
        this.emit('disconnect');
    }
    async sendTransaction(transaction, connection, options = {}) {
        try {
            const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
            if (!account)
                throw new WalletNotConnectedError();
            let feature;
            if (SolanaSignAndSendTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
                if (account.features.includes(SolanaSignAndSendTransaction)) {
                    feature = SolanaSignAndSendTransaction;
                }
                else if (SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features &&
                    account.features.includes(SolanaSignTransaction)) {
                    feature = SolanaSignTransaction;
                }
                else {
                    throw new WalletAccountError();
                }
            }
            else if (SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features) {
                if (!account.features.includes(SolanaSignTransaction))
                    throw new WalletAccountError();
                feature = SolanaSignTransaction;
            }
            else {
                throw new WalletConfigError();
            }
            const chain = getChainForEndpoint(connection.rpcEndpoint);
            if (!account.chains.includes(chain))
                throw new WalletSendTransactionError();
            try {
                const { signers, ...sendOptions } = options;
                let serializedTransaction;
                if (isVersionedTransaction(transaction)) {
                    signers?.length && transaction.sign(signers);
                    serializedTransaction = transaction.serialize();
                }
                else {
                    transaction = (await this.prepareTransaction(transaction, connection, sendOptions));
                    signers?.length && transaction.partialSign(...signers);
                    serializedTransaction = new Uint8Array(transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false,
                    }));
                }
                if (feature === SolanaSignAndSendTransaction) {
                    const [output] = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignAndSendTransaction].signAndSendTransaction({
                        account,
                        chain,
                        transaction: serializedTransaction,
                        options: {
                            preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment),
                            skipPreflight: sendOptions.skipPreflight,
                            maxRetries: sendOptions.maxRetries,
                            minContextSlot: sendOptions.minContextSlot,
                        },
                    });
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return bs58.encode(output.signature);
                }
                else {
                    const [output] = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction({
                        account,
                        chain,
                        transaction: serializedTransaction,
                        options: {
                            preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment),
                            minContextSlot: sendOptions.minContextSlot,
                        },
                    });
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    return await connection.sendRawTransaction(output.signedTransaction, {
                        ...sendOptions,
                        preflightCommitment: getCommitment(sendOptions.preflightCommitment || connection.commitment),
                    });
                }
            }
            catch (error) {
                if (error instanceof WalletError)
                    throw error;
                throw new WalletSendTransactionError(error?.message, error);
            }
        }
        catch (error) {
            this.emit('error', error);
            throw error;
        }
    }
}
_StandardWalletAdapter_account = new WeakMap(), _StandardWalletAdapter_publicKey = new WeakMap(), _StandardWalletAdapter_connecting = new WeakMap(), _StandardWalletAdapter_disconnecting = new WeakMap(), _StandardWalletAdapter_off = new WeakMap(), _StandardWalletAdapter_wallet = new WeakMap(), _StandardWalletAdapter_supportedTransactionVersions = new WeakMap(), _StandardWalletAdapter_readyState = new WeakMap(), _StandardWalletAdapter_changed = new WeakMap(), _StandardWalletAdapter_instances = new WeakSet(), _StandardWalletAdapter_connected = function _StandardWalletAdapter_connected(account, publicKey) {
    __classPrivateFieldSet(this, _StandardWalletAdapter_account, account, "f");
    __classPrivateFieldSet(this, _StandardWalletAdapter_publicKey, publicKey, "f");
    if (account?.features.includes(SolanaSignTransaction)) {
        this.signTransaction = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signTransaction);
        this.signAllTransactions = __classPrivateFieldGet(this, _StandardWalletAdapter_instances, "m", _StandardWalletAdapter_signAllTransactions);
    }
    else {
        delete this.signTransaction;
        delete this.signAllTransactions;
    }
    if (account?.features.includes(SolanaSignMessage)) {
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
}, _StandardWalletAdapter_signTransaction = async function _StandardWalletAdapter_signTransaction(transaction) {
    try {
        const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
        if (!account)
            throw new WalletNotConnectedError();
        if (!(SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features))
            throw new WalletConfigError();
        if (!account.features.includes(SolanaSignTransaction))
            throw new WalletAccountError();
        try {
            const signedTransactions = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction({
                account,
                transaction: isVersionedTransaction(transaction)
                    ? transaction.serialize()
                    : new Uint8Array(transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false,
                    })),
            });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const serializedTransaction = signedTransactions[0].signedTransaction;
            return (isVersionedTransaction(transaction)
                ? VersionedTransaction.deserialize(serializedTransaction)
                : Transaction.from(serializedTransaction));
        }
        catch (error) {
            if (error instanceof WalletError)
                throw error;
            throw new WalletSignTransactionError(error?.message, error);
        }
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
}, _StandardWalletAdapter_signAllTransactions = async function _StandardWalletAdapter_signAllTransactions(transactions) {
    try {
        const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
        if (!account)
            throw new WalletNotConnectedError();
        if (!(SolanaSignTransaction in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features))
            throw new WalletConfigError();
        if (!account.features.includes(SolanaSignTransaction))
            throw new WalletSignTransactionError();
        try {
            const signedTransactions = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignTransaction].signTransaction(...transactions.map((transaction) => ({
                account,
                transaction: isVersionedTransaction(transaction)
                    ? transaction.serialize()
                    : new Uint8Array(transaction.serialize({
                        requireAllSignatures: false,
                        verifySignatures: false,
                    })),
            })));
            return transactions.map((transaction, index) => {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                const signedTransaction = signedTransactions[index].signedTransaction;
                return (isVersionedTransaction(transaction)
                    ? VersionedTransaction.deserialize(signedTransaction)
                    : Transaction.from(signedTransaction));
            });
        }
        catch (error) {
            throw new WalletSignTransactionError(error?.message, error);
        }
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
}, _StandardWalletAdapter_signMessage = async function _StandardWalletAdapter_signMessage(message) {
    try {
        const account = __classPrivateFieldGet(this, _StandardWalletAdapter_account, "f");
        if (!account)
            throw new WalletNotConnectedError();
        if (!(SolanaSignMessage in __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features))
            throw new WalletConfigError();
        if (!account.features.includes(SolanaSignMessage))
            throw new WalletSignMessageError();
        try {
            const signedMessages = await __classPrivateFieldGet(this, _StandardWalletAdapter_wallet, "f").features[SolanaSignMessage].signMessage({
                account,
                message,
            });
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return signedMessages[0].signature;
        }
        catch (error) {
            throw new WalletSignMessageError(error?.message, error);
        }
    }
    catch (error) {
        this.emit('error', error);
        throw error;
    }
};
//# sourceMappingURL=adapter.js.map