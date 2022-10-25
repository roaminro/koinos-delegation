import { Writer, Reader } from "as-proto";

export namespace delegation {
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

  export class increase_delegation_arguments {
    static encode(
      message: increase_delegation_arguments,
      writer: Writer
    ): void {
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

    static decode(reader: Reader, length: i32): increase_delegation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new increase_delegation_arguments();

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

  export class decrease_delegation_arguments {
    static encode(
      message: decrease_delegation_arguments,
      writer: Writer
    ): void {
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

    static decode(reader: Reader, length: i32): decrease_delegation_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new decrease_delegation_arguments();

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

  export class process_undelegations_arguments {
    static encode(
      message: process_undelegations_arguments,
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
    ): process_undelegations_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new process_undelegations_arguments();

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
        balance_result.encode(unique_name_delegations[i], writer);
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
              balance_result.decode(reader, reader.uint32())
            );
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    delegations: Array<balance_result>;

    constructor(delegations: Array<balance_result> = []) {
      this.delegations = delegations;
    }
  }

  export class get_balance_arguments {
    static encode(message: get_balance_arguments, writer: Writer): void {
      const unique_name_account = message.account;
      if (unique_name_account !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_account);
      }
    }

    static decode(reader: Reader, length: i32): get_balance_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_balance_arguments();

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
  export class get_metadata_arguments {
    static encode(message: get_metadata_arguments, writer: Writer): void {}

    static decode(reader: Reader, length: i32): get_metadata_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_metadata_arguments();

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

  @unmanaged
  export class consume_mana_arguments {
    static encode(message: consume_mana_arguments, writer: Writer): void {}

    static decode(reader: Reader, length: i32): consume_mana_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new consume_mana_arguments();

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

  export class balance_result {
    static encode(message: balance_result, writer: Writer): void {
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

    static decode(reader: Reader, length: i32): balance_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new balance_result();

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

  export class key {
    static encode(message: key, writer: Writer): void {
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

    static decode(reader: Reader, length: i32): key {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new key();

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
  export class mana_balance {
    static encode(message: mana_balance, writer: Writer): void {
      if (message.balance != 0) {
        writer.uint32(8);
        writer.uint64(message.balance);
      }

      if (message.mana != 0) {
        writer.uint32(16);
        writer.uint64(message.mana);
      }

      if (message.last_mana_update != 0) {
        writer.uint32(24);
        writer.uint64(message.last_mana_update);
      }
    }

    static decode(reader: Reader, length: i32): mana_balance {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new mana_balance();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.balance = reader.uint64();
            break;

          case 2:
            message.mana = reader.uint64();
            break;

          case 3:
            message.last_mana_update = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    balance: u64;
    mana: u64;
    last_mana_update: u64;

    constructor(balance: u64 = 0, mana: u64 = 0, last_mana_update: u64 = 0) {
      this.balance = balance;
      this.mana = mana;
      this.last_mana_update = last_mana_update;
    }
  }

  @unmanaged
  export class balance {
    static encode(message: balance, writer: Writer): void {
      if (message.amount != 0) {
        writer.uint32(8);
        writer.uint64(message.amount);
      }
    }

    static decode(reader: Reader, length: i32): balance {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new balance();

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

  export class metadata_object {
    static encode(message: metadata_object, writer: Writer): void {
      const unique_name_last_mana_consumer = message.last_mana_consumer;
      if (unique_name_last_mana_consumer !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_last_mana_consumer);
      }

      if (message.balance_at_last_head_block_time != 0) {
        writer.uint32(16);
        writer.uint64(message.balance_at_last_head_block_time);
      }

      if (message.mana_at_last_head_block_time != 0) {
        writer.uint32(24);
        writer.uint64(message.mana_at_last_head_block_time);
      }

      if (message.last_head_block_time != 0) {
        writer.uint32(32);
        writer.uint64(message.last_head_block_time);
      }
    }

    static decode(reader: Reader, length: i32): metadata_object {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new metadata_object();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.last_mana_consumer = reader.bytes();
            break;

          case 2:
            message.balance_at_last_head_block_time = reader.uint64();
            break;

          case 3:
            message.mana_at_last_head_block_time = reader.uint64();
            break;

          case 4:
            message.last_head_block_time = reader.uint64();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    last_mana_consumer: Uint8Array | null;
    balance_at_last_head_block_time: u64;
    mana_at_last_head_block_time: u64;
    last_head_block_time: u64;

    constructor(
      last_mana_consumer: Uint8Array | null = null,
      balance_at_last_head_block_time: u64 = 0,
      mana_at_last_head_block_time: u64 = 0,
      last_head_block_time: u64 = 0
    ) {
      this.last_mana_consumer = last_mana_consumer;
      this.balance_at_last_head_block_time = balance_at_last_head_block_time;
      this.mana_at_last_head_block_time = mana_at_last_head_block_time;
      this.last_head_block_time = last_head_block_time;
    }
  }
}
