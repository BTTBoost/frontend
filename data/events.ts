import { ChainId } from './networks'

export type EventInfo = {
  logo: string
  caption: string
  value: string
  label: string
  chainId: ChainId
}

export const events: EventInfo[] = [
  {
    label: 'AAVE v2 deposits',
    logo: 'https://etherscan.io/token/images/aave_32.png',
    caption: 'Deposits on AAVE (Mainnet)',
    chainId: ChainId.ETH,
    value: 'aave-mainnet'
  },
  {
    label: 'AAVE v2 deposits',
    logo: 'https://etherscan.io/token/images/aave_32.png',
    caption: 'Deposits on AAVE (Polygon)',
    chainId: ChainId.MATIC,
    value: 'aave-polygon'
  },
  {
    label: 'OpenSea trades',
    logo: 'https://etherscan.io/token/images/opensea_32.png',
    caption: 'Trades on OpenSea',
    chainId: ChainId.ETH,
    value: 'opensea'
  },
  {
    label: 'LooksRare trades',
    logo: 'https://etherscan.io/token/images/looksrare_32.png',
    caption: 'Trades on LooksRare',
    chainId: ChainId.ETH,
    value: 'looksrare'
  }
]