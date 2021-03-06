import { BigNumber } from 'ethers'

export interface Content {
  cid: string
  metadataCid: string
  author: string
  likes: BigNumber
  dislikes: BigNumber
  netlikes: BigNumber
  milestone: BigNumber
  contentType: string
  timeStamp: BigNumber
}

export interface Nft {
  id: BigNumber
  tokenAddress: string
  tokenId: string
  tokenStandard: BigNumber
  likes: BigNumber
  dislikes: BigNumber
  netlikes: BigNumber
  milestone: BigNumber
  timeStamp: BigNumber
}
