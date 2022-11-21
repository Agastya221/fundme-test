import { funded as fundedEvent } from "../generated/Fundme/Fundme"
import { funded } from "../generated/schema"

export function handlefunded(event: fundedEvent): void {
  let entity = new funded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.funder = event.params.funder
  entity.amountFund = event.params.amountFund

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
