import { System, Protobuf, authority } from "@koinos/sdk-as";
import { Delegation_manager as ContractClass } from "./Delegation_manager";
import { delegation_manager as ProtoNamespace } from "./proto/delegation_manager";

export function main(): i32 {
  const contractArgs = System.getArguments();
  let retbuf = new Uint8Array(1024);

  const c = new ContractClass();

  switch (contractArgs.entry_point) {
    case 0x17e8d266: {
      const args =
        Protobuf.decode<ProtoNamespace.register_delegation_contract_arguments>(
          contractArgs.args,
          ProtoNamespace.register_delegation_contract_arguments.decode
        );
      const res = c.register_delegation_contract(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0xebb57b6f: {
      const args = Protobuf.decode<ProtoNamespace.add_delegation_arguments>(
        contractArgs.args,
        ProtoNamespace.add_delegation_arguments.decode
      );
      const res = c.add_delegation(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0xd30d1400: {
      const args =
        Protobuf.decode<ProtoNamespace.get_delegation_contract_arguments>(
          contractArgs.args,
          ProtoNamespace.get_delegation_contract_arguments.decode
        );
      const res = c.get_delegation_contract(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.get_delegation_contract_result.encode
      );
      break;
    }

    case 0x107bb6e0: {
      const args =
        Protobuf.decode<ProtoNamespace.get_delegations_from_arguments>(
          contractArgs.args,
          ProtoNamespace.get_delegations_from_arguments.decode
        );
      const res = c.get_delegations_from(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.get_delegations_result.encode
      );
      break;
    }

    case 0xca0cac4e: {
      const args = Protobuf.decode<ProtoNamespace.get_delegations_to_arguments>(
        contractArgs.args,
        ProtoNamespace.get_delegations_to_arguments.decode
      );
      const res = c.get_delegations_to(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.get_delegations_result.encode
      );
      break;
    }

    case 0x3906e8de: {
      const args =
        Protobuf.decode<ProtoNamespace.get_all_delegations_arguments>(
          contractArgs.args,
          ProtoNamespace.get_all_delegations_arguments.decode
        );
      const res = c.get_all_delegations(args);
      retbuf = Protobuf.encode(
        res,
        ProtoNamespace.get_delegations_result.encode
      );
      break;
    }

    default:
      System.exit(1);
      break;
  }

  System.exit(0, retbuf);
  return 0;
}

main();
