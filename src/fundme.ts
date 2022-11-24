import { funded as fundedEvent } from "../generated/Fundme/Fundme"
import { funded } from "../generated/schema"
import { BigInt,Address} from "@graphprotocol/graph-ts"

export function handlefunded(event: fundedEvent): void {


  let Funded = funded.load(getIdFromEventParams(event.params.amountFund, event.params.funder));
  Funded.funder = event.params.funder
  Funded.amountFund = event.params.amountFund

  Funded.blockNumber = event.block.number
  Funded.blockTimestamp = event.block.timestamp
  Funded.transactionHash = event.transaction.hash

  Funded.save()
}
function getIdFromEventParams(amountFund: BigInt, funder: Address): string {
    return amountFund.toHexString() + funder.toHexString()
}
