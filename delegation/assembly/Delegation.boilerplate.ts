import { System, Protobuf, authority } from "@koinos/sdk-as";
import { delegation } from "./proto/delegation";

export class Delegation {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    // const call = args.call;
    // const type = args.type;

    // YOUR CODE HERE

    const res = new authority.authorize_result();
    res.value = true;

    return res;
  }

  increase_delegation(
    args: delegation.increase_delegation_arguments
  ): delegation.empty_message {
    // const from = args.from;
    // const to = args.to;
    // const amount = args.amount;

    // YOUR CODE HERE

    const res = new delegation.empty_message();

    return res;
  }

  decrease_delegation(
    args: delegation.decrease_delegation_arguments
  ): delegation.empty_message {
    // const from = args.from;
    // const to = args.to;
    // const amount = args.amount;

    // YOUR CODE HERE

    const res = new delegation.empty_message();

    return res;
  }

  process_undelegations(
    args: delegation.process_undelegations_arguments
  ): delegation.empty_message {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation.empty_message();

    return res;
  }

  get_delegations_from(
    args: delegation.get_delegations_from_arguments
  ): delegation.get_delegations_result {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation.get_delegations_result();
    // res.delegations = ;

    return res;
  }

  get_delegations_to(
    args: delegation.get_delegations_to_arguments
  ): delegation.get_delegations_result {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation.get_delegations_result();
    // res.delegations = ;

    return res;
  }

  get_balance(args: delegation.get_balance_arguments): delegation.mana_balance {
    // const account = args.account;

    // YOUR CODE HERE

    const res = new delegation.mana_balance();
    // res.balance = ;
    // res.mana = ;
    // res.last_mana_update = ;

    return res;
  }

  get_metadata(
    args: delegation.get_metadata_arguments
  ): delegation.metadata_object {
    // YOUR CODE HERE

    const res = new delegation.metadata_object();
    // res.last_mana_consumer = ;
    // res.balance_at_last_head_block_time = ;
    // res.mana_at_last_head_block_time = ;
    // res.last_head_block_time = ;

    return res;
  }

  consume_mana(
    args: delegation.consume_mana_arguments
  ): delegation.empty_message {
    // YOUR CODE HERE

    const res = new delegation.empty_message();

    return res;
  }
}
