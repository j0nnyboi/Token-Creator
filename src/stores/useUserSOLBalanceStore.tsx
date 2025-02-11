import create, { State } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SAFE } from '@safecoin/web3.js'



interface UserSOLBalanceStore extends State {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => void
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set, _get) => ({
  balance: 0,
  getUserSOLBalance: async (publicKey, connection) => {
    let balance = 0;
	console.log(connection);
    try {
      balance = await connection.getBalance(
        publicKey,
        'confirmed'
      );
      balance = balance / LAMPORTS_PER_SAFE;
    } catch (e) {
      console.log(`error getting balance: `, e);
    }
    set((s) => {
      s.balance = balance;
      console.log(`balance updated, `, balance);
    })
  },
}));

export default useUserSOLBalanceStore;