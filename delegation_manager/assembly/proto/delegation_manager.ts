import { Writer, Reader } from "as-proto";

export namespace delegation_manager {
  export class register_delegation_contract_arguments {
    static encode(
      message: register_delegation_contract_arguments,
      writer: Writer
    ): void {
      const unique_name_account = message.account;
      if (unique_name_account !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_account);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): register_delegation_contract_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new register_delegation_contract_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  @unmanaged
  export class empty_message {
    static encode(message: empty_message, writer: Writer): void {}

    static decode(reader: Reader, length: i32): empty_message {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new empty_message();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() {}
  }

  export class add_delegation_arguments {
    static encode(message: add_delegation_arguments, writer: Writer): void {
      const unique_name_from = message.from;
      if (unique_name_from !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_from);
      }

      const unique_name_to = message.to;
      if (unique_name_to !== null) {
        writer.uint32(18);
        writer.bytes(unique_name_to);
      }

      if (message.amount != 0) {
        writer.uint32(24);
        writer.uint64(message.amount);
      }
    }

    static decode(reader: Reader, length: i32): add_delegation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new add_delegation_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.from = reader.bytes();
            break;

          case 2:
            message.to = reader.bytes();
            break;

          case 3:
            message.amount = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    from: Uint8Array | null;
    to: Uint8Array | null;
    amount: u64;

    constructor(
      from: Uint8Array | null = null,
      to: Uint8Array | null = null,
      amount: u64 = 0
    ) {
      this.from = from;
      this.to = to;
      this.amount = amount;
    }
  }

  export class get_delegation_contract_arguments {
    static encode(
      message: get_delegation_contract_arguments,
      writer: Writer
    ): void {
      const unique_name_account = message.account;
      if (unique_name_account !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_account);
      }
    }

    static decode(
      reader: Reader,
      length: i32
    ): get_delegation_contract_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_delegation_contract_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  export class get_delegation_contract_result {
    static encode(
      message: get_delegation_contract_result,
      writer: Writer
    ): void {
      const unique_name_contract = message.contract;
      if (unique_name_contract !== null) {
        writer.uint32(10);
        writer.fork();
        delegation_contract.encode(unique_name_contract, writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_delegation_contract_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_delegation_contract_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contract = delegation_contract.decode(
              reader,
              reader.uint32()
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contract: delegation_contract | null;

    constructor(contract: delegation_contract | null = null) {
      this.contract = contract;
    }
  }

  export class get_delegations_from_arguments {
    static encode(
      message: get_delegations_from_arguments,
      writer: Writer
    ): void {
      const unique_name_account = message.account;
      if (unique_name_account !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_account);
      }
    }

    static decode(reader: Reader, length: i32): get_delegations_from_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_delegations_from_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  export class get_delegations_to_arguments {
    static encode(message: get_delegations_to_arguments, writer: Writer): void {
      const unique_name_account = message.account;
      if (unique_name_account !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_account);
      }
    }

    static decode(reader: Reader, length: i32): get_delegations_to_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_delegations_to_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;

    constructor(account: Uint8Array | null = null) {
      this.account = account;
    }
  }

  export class get_delegations_result {
    static encode(message: get_delegations_result, writer: Writer): void {
      const unique_name_delegations = message.delegations;
      for (let i = 0; i < unique_name_delegations.length; ++i) {
        writer.uint32(10);
        writer.fork();
        delegation_result.encode(unique_name_delegations[i], writer);
        writer.ldelim();
      }
    }

    static decode(reader: Reader, length: i32): get_delegations_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_delegations_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.delegations.push(
              delegation_result.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    delegations: Array<delegation_result>;

    constructor(delegations: Array<delegation_result> = []) {
      this.delegations = delegations;
    }
  }

  @unmanaged
  export class get_all_delegations_arguments {
    static encode(
      message: get_all_delegations_arguments,
      writer: Writer
    ): void {}

    static decode(reader: Reader, length: i32): get_all_delegations_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_all_delegations_arguments();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    constructor() {}
  }

  export class delegation_result {
    static encode(message: delegation_result, writer: Writer): void {
      const unique_name_account = message.account;
      if (unique_name_account !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_account);
      }

      if (message.amount != 0) {
        writer.uint32(16);
        writer.uint64(message.amount);
      }
    }

    static decode(reader: Reader, length: i32): delegation_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new delegation_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account = reader.bytes();
            break;

          case 2:
            message.amount = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account: Uint8Array | null;
    amount: u64;

    constructor(account: Uint8Array | null = null, amount: u64 = 0) {
      this.account = account;
      this.amount = amount;
    }
  }

  export class delegation_key {
    static encode(message: delegation_key, writer: Writer): void {
      const unique_name_account1 = message.account1;
      if (unique_name_account1 !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_account1);
      }

      const unique_name_account2 = message.account2;
      if (unique_name_account2 !== null) {
        writer.uint32(18);
        writer.bytes(unique_name_account2);
      }
    }

    static decode(reader: Reader, length: i32): delegation_key {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new delegation_key();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.account1 = reader.bytes();
            break;

          case 2:
            message.account2 = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    account1: Uint8Array | null;
    account2: Uint8Array | null;

    constructor(
      account1: Uint8Array | null = null,
      account2: Uint8Array | null = null
    ) {
      this.account1 = account1;
      this.account2 = account2;
    }
  }

  @unmanaged
  export class delegation {
    static encode(message: delegation, writer: Writer): void {
      if (message.amount != 0) {
        writer.uint32(8);
        writer.uint64(message.amount);
      }
    }

    static decode(reader: Reader, length: i32): delegation {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new delegation();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.amount = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    amount: u64;

    constructor(amount: u64 = 0) {
      this.amount = amount;
    }
  }

  export class delegation_contract {
    static encode(message: delegation_contract, writer: Writer): void {
      const unique_name_contract_id = message.contract_id;
      if (unique_name_contract_id !== null) {
        writer.uint32(18);
        writer.bytes(unique_name_contract_id);
      }

      if (message.rc_limit != 0) {
        writer.uint32(24);
        writer.uint64(message.rc_limit);
      }
    }

    static decode(reader: Reader, length: i32): delegation_contract {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new delegation_contract();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 2:
            message.contract_id = reader.bytes();
            break;

          case 3:
            message.rc_limit = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contract_id: Uint8Array | null;
    rc_limit: u64;

    constructor(contract_id: Uint8Array | null = null, rc_limit: u64 = 0) {
      this.contract_id = contract_id;
      this.rc_limit = rc_limit;
    }
  }
}
