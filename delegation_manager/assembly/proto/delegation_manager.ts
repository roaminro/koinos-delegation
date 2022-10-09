import { Writer, Reader } from "as-proto";

export namespace delegation_manager {
  export class register_delegation_contract_arguments {
    static encode(
      message: register_delegation_contract_arguments,
      writer: Writer
    ): void {
      const unique_name_address = message.address;
      if (unique_name_address !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_address);
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
            message.address = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    address: Uint8Array | null;

    constructor(address: Uint8Array | null = null) {
      this.address = address;
    }
  }

  @unmanaged
  export class empty_result {
    static encode(message: empty_result, writer: Writer): void {}

    static decode(reader: Reader, length: i32): empty_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new empty_result();

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

  export class get_delegation_contract_arguments {
    static encode(
      message: get_delegation_contract_arguments,
      writer: Writer
    ): void {
      const unique_name_address = message.address;
      if (unique_name_address !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_address);
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
            message.address = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    address: Uint8Array | null;

    constructor(address: Uint8Array | null = null) {
      this.address = address;
    }
  }

  export class get_delegation_contract_result {
    static encode(
      message: get_delegation_contract_result,
      writer: Writer
    ): void {
      const unique_name_contract_id = message.contract_id;
      if (unique_name_contract_id !== null) {
        writer.uint32(10);
        writer.bytes(unique_name_contract_id);
      }
    }

    static decode(reader: Reader, length: i32): get_delegation_contract_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new get_delegation_contract_result();

      while (reader.ptr < end) {
        const tag = reader.uint32();
        switch (tag >>> 3) {
          case 1:
            message.contract_id = reader.bytes();
            break;

          default:
            reader.skipType(tag & 7);
            break;
        }
      }

      return message;
    }

    contract_id: Uint8Array | null;

    constructor(contract_id: Uint8Array | null = null) {
      this.contract_id = contract_id;
    }
  }
}
