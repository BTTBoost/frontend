export type ERC20Token = {
  address: string
  label: string
  symbol: string
  logo: string
  network: 'eth' | 'matic'
}

export const tokens: ERC20Token[] = [
  {
    address: '0x35bd01fc9d6d5d81ca9e055db88dc49aa2c699a8',
    network: 'eth',
    symbol: 'FWB',
    label: 'Friends With Benefits Pro',
    logo: 'https://etherscan.io/token/images/friendswithbenefits_32.png'
  },
  {
    address: '0x64aa3364f17a4d01c6f1751fd97c2bd3d7e7f1d5',
    network: 'eth',
    symbol: 'OHM',
    label: 'Olympus',
    logo: 'https://etherscan.io/token/images/olympusdao2_32.png'
  }
]
