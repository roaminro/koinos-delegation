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
}
