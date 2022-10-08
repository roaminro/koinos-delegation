import { Base58, Token, System } from "@koinos/sdk-as";
import { delegation_manager } from "./proto/delegation_manager";

const KOIN_CONTRACT_ID = '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ';
const DELEGATION_CONTRACT_ID = '1LrDAuFejtNGnVuVhyrMgLo7N7XnUz12DK';

export class Delegation_manager {
  transfer(
    args: delegation_manager.transfer_arguments
  ): delegation_manager.transfer_result {
    const koin = new Token(Base58.decode(KOIN_CONTRACT_ID));

    koin.transfer(Base58.decode(DELEGATION_CONTRACT_ID), Base58.decode('18VpN36TGrssknBaAbA68nuZFMebN8QDro'), 1);

    return new delegation_manager.transfer_result();
  }
}
