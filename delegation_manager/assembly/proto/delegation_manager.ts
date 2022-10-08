import { Writer, Reader } from "as-proto";

export namespace delegation_manager {
  @unmanaged
  export class transfer_arguments {
    static encode(message: transfer_arguments, writer: Writer): void {}

    static decode(reader: Reader, length: i32): transfer_arguments {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new transfer_arguments();

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
  export class transfer_result {
    static encode(message: transfer_result, writer: Writer): void {}

    static decode(reader: Reader, length: i32): transfer_result {
      const end: usize = length < 0 ? reader.end : reader.ptr + length;
      const message = new transfer_result();

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
}
