import { System, Protobuf, authority } from "@koinos/sdk-as";
import { delegation_manager } from "./proto/delegation_manager";

export class Delegation_manager {
  register_delegation_contract(
    args: delegation_manager.register_delegation_contract_arguments
  ): delegation_manager.empty_result {
    // const address = args.address;

    // YOUR CODE HERE

    const res = new delegation_manager.empty_result();

    return res;
  }

  get_delegation_contract(
    args: delegation_manager.get_delegation_contract_arguments
  ): delegation_manager.get_delegation_contract_result {
    // const address = args.address;

    // YOUR CODE HERE

    const res = new delegation_manager.get_delegation_contract_result();
    // res.contract_id = ;

    return res;
  }
}
