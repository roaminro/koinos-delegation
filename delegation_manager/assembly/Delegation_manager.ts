import { Base58, Token, System, Storage, chain, Protobuf, value, protocol, Crypto, Arrays } from "@koinos/sdk-as";
import { delegation_manager } from "./proto/delegation_manager";

const KOIN_CONTRACT_ID = '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ';
const DELEGATION_CONTRACT_BYTECODE_DIGEST = Arrays.fromHexString('12203fc5158c2f30b713fb761326f22fcf56c2164e9fb7ccd703002cf14794a92d90');

export class Delegation_manager {
  contractId: Uint8Array = System.getContractId();
  delegationContractsSpace: chain.object_space = new chain.object_space(false, this.contractId, 0);

  register_delegation_contract(
    args: delegation_manager.register_delegation_contract_arguments
  ): delegation_manager.empty_result {
    System.require(args.address != null, 'Argument address is required');

    const address = args.address!;

    // check if there is no delegation contract already registered
    const contractId = System.getBytes<Uint8Array>(this.delegationContractsSpace, address);
    if (contractId != null) {
      System.revert(`Address ${Base58.encode(address)} has already a delegation contract registered ${Base58.encode(contractId)}`);
    }

    // increase buffer to 20kb in order to be able to retrieve the operations
    System.setSystemBufferSize(1024 * 20);

    // check that the transaction only has 2 operations
    const operations = Protobuf.decode<value.list_type>(System.getTransactionField('operations')!.message_value!.value!, value.list_type.decode);
    System.require(operations.values.length == 2, 'transaction must have only 2 operations');

    // check type of operations
    // first operation should be the delegation contract upload
    let operation = Protobuf.decode<protocol.operation>(operations.values[0].message_value!.value!, protocol.operation.decode);

    // check that authorizations have been overriden
    System.require(operation.upload_contract!.authorizes_call_contract == true, 'authorizes_call_contract must be set to true when uploading the delegation contract');
    System.require(operation.upload_contract!.authorizes_transaction_application == true, 'authorizes_transaction_application must be set to true when uploading the delegation contract');
    System.require(operation.upload_contract!.authorizes_upload_contract == true, 'authorizes_upload_contract must be set to true when uploading the delegation contract');

    // check that the bytecode is the delegation contract
    const bytecodeDigest = System.hash(Crypto.multicodec.sha2_256, operation.upload_contract!.bytecode!)!;
    System.require(Arrays.equal(bytecodeDigest, DELEGATION_CONTRACT_BYTECODE_DIGEST), 'contract uploaded is invalid');

    // second operation is the once calling this function

    // register contract
    System.putBytes<Uint8Array>(this.delegationContractsSpace, address, operation.upload_contract!.contract_id!);

    return new delegation_manager.empty_result();
  }

  get_delegation_contract(
    args: delegation_manager.get_delegation_contract_arguments
  ): delegation_manager.get_delegation_contract_result {
    System.require(args.address != null, 'Argument address is required');

    return new delegation_manager.get_delegation_contract_result(System.getBytes<Uint8Array>(this.delegationContractsSpace, args.address!));
  }
}
