import { PublicKey, Transaction } from '@safecoin/web3.js'
import base58 from 'bs58'

export function getExplorerUrl(
    endpoint: string,
    viewTypeOrItemAddress: 'inspector' | PublicKey | string,
    itemType = 'address' // | 'tx' | 'block'
  ) {
    const getClusterUrlParam = () => {
      let cluster = ''
      if (endpoint === 'localnet') {
        cluster = `custom&customUrl=${encodeURIComponent(
          'http://127.0.0.1:8899'
        )}`
      } else if (endpoint === 'https://api.devnet.safecoin.org') {
        cluster = 'devnet'
      }
	  
  
      return cluster ? `?cluster=${cluster}` : ''
    }
  
    return `https://explorer.safecoin.org/${itemType}/${viewTypeOrItemAddress}${getClusterUrlParam()}`
  }