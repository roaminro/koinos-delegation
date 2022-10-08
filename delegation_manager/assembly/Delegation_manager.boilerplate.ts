import { System, Protobuf, authority } from "@koinos/sdk-as";
import { delegation_manager } from "./proto/delegation_manager";

export class Delegation_manager {
  transfer(
    args: delegation_manager.transfer_arguments
  ): delegation_manager.transfer_result {
    // YOUR CODE HERE

    const res = new delegation_manager.transfer_result();

    return res;
  }
}
