import { System, Protobuf, authority } from "@koinos/sdk-as";
import { delegation_manager } from "./proto/delegation_manager";

export class Delegation_manager {
  register_delegation_contract(
    args: delegation_manager.register_delegation_contract_arguments
  ): delegation_manager.empty_message {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation_manager.empty_message();

    return res;
  }

  add_delegation(
    args: delegation_manager.add_delegation_arguments
  ): delegation_manager.empty_message {
    // const from = args.from;
    // const to = args.to;
    // const amount = args.amount;

    // YOUR CODE HERE

    const res = new delegation_manager.empty_message();

    return res;
  }

  get_delegation_contract(
    args: delegation_manager.get_delegation_contract_arguments
  ): delegation_manager.get_delegation_contract_result {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation_manager.get_delegation_contract_result();
    // res.contract = ;

    return res;
  }

  get_delegations_from(
    args: delegation_manager.get_delegations_from_arguments
  ): delegation_manager.get_delegations_result {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation_manager.get_delegations_result();
    // res.delegations = ;

    return res;
  }

  get_delegations_to(
    args: delegation_manager.get_delegations_to_arguments
  ): delegation_manager.get_delegations_result {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation_manager.get_delegations_result();
    // res.delegations = ;

    return res;
  }

  get_all_delegations(
    args: delegation_manager.get_all_delegations_arguments
  ): delegation_manager.get_delegations_result {
    // YOUR CODE HERE

    const res = new delegation_manager.get_delegations_result();
    // res.delegations = ;

    return res;
  }
}
