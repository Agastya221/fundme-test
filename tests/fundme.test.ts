import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { funded } from "../generated/schema"
import { funded as fundedEvent } from "../generated/Fundme/Fundme"
import { handlefunded } from "../src/fundme"
import { createfundedEvent } from "./fundme-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let funder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amountFund = BigInt.fromI32(234)
    let newfundedEvent = createfundedEvent(funder, amountFund)
    handlefunded(newfundedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("funded created and stored", () => {
    assert.entityCount("funded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "funded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "funder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "funded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountFund",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
