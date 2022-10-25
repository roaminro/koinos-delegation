import { System, Protobuf, authority } from "@koinos/sdk-as";
import { Delegation as ContractClass } from "./Delegation";
import { delegation as ProtoNamespace } from "./proto/delegation";

export function main(): i32 {
  const contractArgs = System.getArguments();
  let retbuf = new Uint8Array(1024);

  const c = new ContractClass();

  switch (contractArgs.entry_point) {
    case 0x4a2dbd90: {
      const args = Protobuf.decode<authority.authorize_arguments>(
        contractArgs.args,
        authority.authorize_arguments.decode
      );
      const res = c.authorize(args);
      retbuf = Protobuf.encode(res, authority.authorize_result.encode);
      break;
    }

    case 0x8c4f0419: {
      const args =
        Protobuf.decode<ProtoNamespace.increase_delegation_arguments>(
          contractArgs.args,
          ProtoNamespace.increase_delegation_arguments.decode
        );
      const res = c.increase_delegation(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0xede583a0: {
      const args =
        Protobuf.decode<ProtoNamespace.decrease_delegation_arguments>(
          contractArgs.args,
          ProtoNamespace.decrease_delegation_arguments.decode
        );
      const res = c.decrease_delegation(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
      break;
    }

    case 0xe1022d5c: {
      const args =
        Protobuf.decode<ProtoNamespace.process_undelegations_arguments>(
          contractArgs.args,
          ProtoNamespace.process_undelegations_arguments.decode
        );
      const res = c.process_undelegations(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
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

    case 0x6111606c: {
      const args = Protobuf.decode<ProtoNamespace.get_balance_arguments>(
        contractArgs.args,
        ProtoNamespace.get_balance_arguments.decode
      );
      const res = c.get_balance(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.mana_balance.encode);
      break;
    }

    case 0xfcf7a68f: {
      const args = Protobuf.decode<ProtoNamespace.get_metadata_arguments>(
        contractArgs.args,
        ProtoNamespace.get_metadata_arguments.decode
      );
      const res = c.get_metadata(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.metadata_object.encode);
      break;
    }

    case 0x69febb38: {
      const args = Protobuf.decode<ProtoNamespace.consume_mana_arguments>(
        contractArgs.args,
        ProtoNamespace.consume_mana_arguments.decode
      );
      const res = c.consume_mana(args);
      retbuf = Protobuf.encode(res, ProtoNamespace.empty_message.encode);
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
