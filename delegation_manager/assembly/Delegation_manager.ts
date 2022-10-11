import { Base58, Token, System, Storage, chain, Protobuf, value, protocol, Crypto, Arrays, system_calls } from "@koinos/sdk-as";
import { delegation_manager } from "./proto/delegation_manager";

const KOIN_CONTRACT_ID = Base58.decode('19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ');
const DELEGATION_CONTRACT_BYTECODE_DIGEST = Arrays.fromHexString('12203fc5158c2f30b713fb761326f22fcf56c2164e9fb7ccd703002cf14794a92d90');

const DELEGATION_CONTRACTS_SPACE_ID = 0;
const DELEGATIONS_FROM_SPACE_ID = 1;
const DELEGATIONS_TO_INDEX_SPACE_ID = 2;

const AUTHORIZED_USERS_SPACE_ID = 3;

export class Delegation_manager {
  contractId: Uint8Array = System.getContractId();

  koinContract: Token = new Token(KOIN_CONTRACT_ID);

  // Storage
  delegationContracts: Storage.Map<Uint8Array, delegation_manager.delegation_contract> = new Storage.Map<Uint8Array, delegation_manager.delegation_contract>(
    this.contractId,
    DELEGATION_CONTRACTS_SPACE_ID,
    delegation_manager.delegation_contract.decode,
    delegation_manager.delegation_contract.encode
  );

  delegationsFrom: Storage.ProtoMap<delegation_manager.delegation_key, delegation_manager.delegation> = new Storage.ProtoMap<delegation_manager.delegation_key, delegation_manager.delegation>(
    this.contractId,
    DELEGATIONS_FROM_SPACE_ID,
    delegation_manager.delegation_key.decode,
    delegation_manager.delegation_key.encode,
    delegation_manager.delegation.decode,
    delegation_manager.delegation.encode,
  );

  delegationsToIndexSpace: chain.object_space = new chain.object_space(false, this.contractId, DELEGATIONS_TO_INDEX_SPACE_ID);
  
  authorizedUsersSpace: chain.object_space = new chain.object_space(false, this.contractId, AUTHORIZED_USERS_SPACE_ID);

  updateDelegation(from: Uint8Array, to: Uint8Array, amount: u64): void {
    // add in delegationsFrom
    let delegationKey = new delegation_manager.delegation_key(from, to);
    this.delegationsFrom.put(delegationKey, new delegation_manager.delegation(amount));

    // add in delegationsTo index
    delegationKey = new delegation_manager.delegation_key(to, from);
    System.putBytes(
      this.delegationsToIndexSpace,
      Protobuf.encode(
        delegationKey,
        delegation_manager.delegation_key.encode
      ),
      new Uint8Array(0)
    );
  }

  register_delegation_contract(
    args: delegation_manager.register_delegation_contract_arguments
  ): delegation_manager.empty_message {
    System.require(args.account != null, '"account" is required');

    const account = args.account!;

    this.delegationContracts.remove(account);

    // check if there is no delegation contract already registered
    let contract = this.delegationContracts.get(account);
    if (contract != null) {
      // TODO: uncomment
      // System.revert(`Account ${Base58.encode(account)} has already a delegation contract registered ${Base58.encode(contract!.contract_id!)}`);
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

    // get the id of the contract uploaded
    const contractId = operation.upload_contract!.contract_id!;

    // TODO: is this check necessary?
    // second operation should be the one calling this function
    operation = Protobuf.decode<protocol.operation>(operations.values[1].message_value!.value!, protocol.operation.decode);
    System.require(Arrays.equal(operation.call_contract!.contract_id, this.contractId), 'call_contract must be calling this contract');
    System.require(operation.call_contract!.entry_point == 0x17e8d266, 'call_contract must be calling the register_contract entry point');

    // create a delegation with the Koin tokens that are already owned by the delegation contract
    const delegationContractBalance = this.koinContract.balanceOf(contractId);

    if (delegationContractBalance > 0) {
      this.updateDelegation(account, account, delegationContractBalance);
    }

    // register contract
    const delegationContract = new delegation_manager.delegation_contract(contractId, delegationContractBalance);
    this.delegationContracts.put(account, delegationContract);

    return new delegation_manager.empty_message();
  }

  add_delegation(
    args: delegation_manager.add_delegation_arguments
  ): delegation_manager.empty_message {
    System.require(args.from != null, '"from" is required');
    System.require(args.to != null, '"to" is required');

    const from = args.from!;
    const to = args.to!;
    const amount = args.amount;

    System.require(amount > 0, '"amount" must be greater than 0');

    this.updateDelegation(from, to, amount);

    return new delegation_manager.empty_message();
  }

  get_delegation_contract(
    args: delegation_manager.get_delegation_contract_arguments
  ): delegation_manager.get_delegation_contract_result {
    System.require(args.account != null, '"account" is required');

    return new delegation_manager.get_delegation_contract_result(this.delegationContracts.get(args.account!));
  }

  get_delegations_from(
    args: delegation_manager.get_delegations_from_arguments
  ): delegation_manager.get_delegations_result {
    System.require(args.account != null, '"account" is required');
    const account = args.account!;

    const res = new delegation_manager.get_delegations_result();

    let delegationKey = new delegation_manager.delegation_key(account, new Uint8Array(25).fill(0));

    let done = false;
    let delegation: System.ProtoDatabaseObject<delegation_manager.delegation> | null;
    let key: delegation_manager.delegation_key;

    do {
      delegation = this.delegationsFrom.getNext(delegationKey);

      if (delegation) {
        key = Protobuf.decode<delegation_manager.delegation_key>(delegation.key!, delegation_manager.delegation_key.decode);

        if (Arrays.equal(key.account1, account)) {
          res.delegations.push(new delegation_manager.delegation_result(key.account2, delegation.value.amount));
          delegationKey = key;
        } else {
          done = true;
        }
      } else {
        done = true;
      }

    } while (!done);

    return res;
  }

  get_delegations_to(
    args: delegation_manager.get_delegations_to_arguments
  ): delegation_manager.get_delegations_result {
    System.require(args.account != null, '"account" is required');
    const account = args.account!;

    const res = new delegation_manager.get_delegations_result();

    let currentKey = new delegation_manager.delegation_key(account, new Uint8Array(25).fill(0));

    let done = false;
    let indexDelegation: system_calls.database_object | null;
    let delegation: delegation_manager.delegation;
    let indexKey: delegation_manager.delegation_key;
    let delegationKey: delegation_manager.delegation_key = new delegation_manager.delegation_key();

    do {
      indexDelegation = System.getNextBytes(
        this.delegationsToIndexSpace,
        Protobuf.encode(currentKey, delegation_manager.delegation_key.encode)
      );

      if (indexDelegation) {
        indexKey = Protobuf.decode<delegation_manager.delegation_key>(indexDelegation.key!, delegation_manager.delegation_key.decode);

        if (Arrays.equal(indexKey.account1, account)) {
          delegationKey.account1 = indexKey.account2;
          delegationKey.account2 = indexKey.account1;

          delegation = this.delegationsFrom.get(delegationKey)!;

          res.delegations.push(new delegation_manager.delegation_result(indexKey.account2, delegation.amount));
          currentKey = indexKey;
        } else {
          done = true;
        }
      } else {
        done = true;
      }

    } while (!done);

    return res;
  }

  get_all_delegations(
    args: delegation_manager.get_all_delegations_arguments
  ): delegation_manager.get_delegations_result {
    const res = new delegation_manager.get_delegations_result();

    let delegationKey = new delegation_manager.delegation_key();

    let done = false;
    let delegation: System.ProtoDatabaseObject<delegation_manager.delegation> | null;
    let key: delegation_manager.delegation_key;
    do {
      delegation = this.delegationsFrom.getNext(delegationKey);

      if (delegation) {
        key = Protobuf.decode<delegation_manager.delegation_key>(delegation.key!, delegation_manager.delegation_key.decode);

        res.delegations.push(new delegation_manager.delegation_result(key.account2, delegation.value.amount));
        delegationKey = key;
      } else {
        done = true;
      }

    } while (!done);

    return res;
  }
}
