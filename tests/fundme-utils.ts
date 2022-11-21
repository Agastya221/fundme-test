import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { funded } from "../generated/Fundme/Fundme"

export function createfundedEvent(funder: Address, amountFund: BigInt): funded {
  let fundedEvent = changetype<funded>(newMockEvent())

  fundedEvent.parameters = new Array()

  fundedEvent.parameters.push(
    new ethereum.EventParam("funder", ethereum.Value.fromAddress(funder))
  )
  fundedEvent.parameters.push(
    new ethereum.EventParam(
      "amountFund",
      ethereum.Value.fromUnsignedBigInt(amountFund)
    )
  )

  return fundedEvent
}
