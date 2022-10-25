import { authority, Base58, Arrays, chain, Storage, System, Token, Protobuf, system_calls, u128 } from "@koinos/sdk-as";
import { delegation } from "./proto/delegation";

const KOIN_CONTRACT_ID = Base58.decode('19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ');

const METADATA_SPACE_ID = 0;
const BALANCES_SPACE_ID = 1;
const DELEGATIONS_FROM_SPACE_ID = 2;
const DELEGATIONS_TO_INDEX_SPACE_ID = 3;
const UNDELEGATIONS_SPACE_ID = 4;

const MANA_REGEN_TIME_MS: u64 = 432000000; // 5 days

export class Delegation {
  contractId: Uint8Array = System.getContractId();

  koinContract: Token = new Token(KOIN_CONTRACT_ID);

  // Storage
  metadata: Storage.Obj<delegation.metadata_object> = new Storage.Obj<delegation.metadata_object>(
    this.contractId,
    METADATA_SPACE_ID,
    delegation.metadata_object.decode,
    delegation.metadata_object.encode,
    () => new delegation.metadata_object()
  );

  manaBalances: Storage.Map<Uint8Array, delegation.mana_balance> = new Storage.Map<Uint8Array, delegation.mana_balance>(
    this.contractId,
    BALANCES_SPACE_ID,
    delegation.mana_balance.decode,
    delegation.mana_balance.encode,
    () => new delegation.mana_balance()
  );

  delegationsFrom: Storage.ProtoMap<delegation.key, delegation.balance> = new Storage.ProtoMap<delegation.key, delegation.balance>(
    this.contractId,
    DELEGATIONS_FROM_SPACE_ID,
    delegation.key.decode,
    delegation.key.encode,
    delegation.balance.decode,
    delegation.balance.encode,
    () => new delegation.balance()
  );

  delegationsToIndexSpace: chain.object_space = new chain.object_space(false, this.contractId, DELEGATIONS_TO_INDEX_SPACE_ID);

  undelegations: Storage.Map<Uint8Array, delegation.balance> = new Storage.Map<Uint8Array, delegation.balance>(
    this.contractId,
    UNDELEGATIONS_SPACE_ID,
    delegation.balance.decode,
    delegation.balance.encode,
    () => new delegation.balance()
  );

  authorize(args: authority.authorize_arguments): authority.authorize_result {
    switch (args.type) {
      case authority.authorization_type.contract_upload:
        // TODO: remove access to contract upload
        return new authority.authorize_result(true);

      case authority.authorization_type.contract_call:
        // only the delegation_CONTRACT_ID is allowed to perform contract calls
        return new authority.authorize_result(Arrays.equal(args.call!.caller, this.contractId));

      case authority.authorization_type.transaction_application: {
        this.consumeMana();

        const payeeField = System.getTransactionField('header.payee');
        const rcLimit = System.getTransactionField('header.rc_limit')!;

        System.require(payeeField, 'missing payee field');
        const payee = payeeField!.bytes_value!;

        // regenerate mana
        const manaBalance = this.manaBalances.get(payee)!;
        this.regenerateMana(manaBalance);
        this.manaBalances.put(payee, manaBalance);

        System.require(manaBalance.mana >= rcLimit.uint64_value, 'not enough mana to cover the transaction');

        // save metadata
        const meta = this.metadata.get()!;

        meta.balance_at_last_head_block_time = this.koinContract.balanceOf(this.contractId);
        meta.mana_at_last_head_block_time = System.getAccountRC(this.contractId);
        meta.last_mana_consumer = payee;
        meta.last_head_block_time = System.getHeadInfo().head_block_time;

        this.metadata.put(meta);

        return new authority.authorize_result(true);
      }
      default:
        return new authority.authorize_result(false);
    }
  }

  calculateConsumedMana(meta: delegation.metadata_object, balance: delegation.mana_balance, headBlockTime: u64): void {
    const currentMana = System.getAccountRC(this.contractId);

    // calculate regenerated mana
    const elapsedTime = headBlockTime - meta.last_head_block_time;
    const delta = elapsedTime < MANA_REGEN_TIME_MS ? elapsedTime : MANA_REGEN_TIME_MS;

    // @ts-ignore valid in AS
    const regeneratedMana = (u128.fromU64(delta) * u128.fromU64(meta.balance_at_last_head_block_time) / u128.fromU64(MANA_REGEN_TIME_MS)).toU64();
    let consumedMana = meta.mana_at_last_head_block_time - currentMana + regeneratedMana;
    consumedMana = consumedMana < 0 ? 0 : consumedMana;

    System.log(`delta: ${delta.toString()}`);
    System.log(`currentMana: ${currentMana.toString()}`);
    System.log(`mana_at_last_head_block_time: ${meta.mana_at_last_head_block_time.toString()}`);
    System.log(`balance_at_last_head_block_time: ${meta.balance_at_last_head_block_time.toString()}`);
    System.log(`regeneratedMana: ${regeneratedMana.toString()}`);
    System.log(`consumedMana: ${consumedMana.toString()}`);

    // update mana
    balance.mana = balance.mana < consumedMana ? 0 : balance.mana - consumedMana;
  }

  consumeMana(): void {
    const meta = this.metadata.get()!;

    if (meta.last_mana_consumer) {
      const headBlockTime = System.getHeadInfo().head_block_time;
      const manaBalance = this.manaBalances.get(meta.last_mana_consumer!)!;

      // calculate consumed mana
      this.calculateConsumedMana(meta, manaBalance, headBlockTime);
      
      // regenerate mana
      this.regenerateMana(manaBalance, headBlockTime);
      this.manaBalances.put(meta.last_mana_consumer!, manaBalance);

      // update metadata
      meta.last_mana_consumer = null;
      this.metadata.put(meta);
    }
  }

  regenerateMana(balance: delegation.mana_balance, headBlockTime: u64 = 0): delegation.mana_balance {
    if (headBlockTime == 0) {
      headBlockTime = System.getHeadInfo().head_block_time;
    }

    const elapsedTime = headBlockTime - balance.last_mana_update;

    const delta = elapsedTime < MANA_REGEN_TIME_MS ? elapsedTime : MANA_REGEN_TIME_MS;

    if (delta) {
      // @ts-ignore valid in AS
      const newMana = balance.mana + (u128.fromU64(delta) * u128.fromU64(balance.balance) / u128.fromU64(MANA_REGEN_TIME_MS)).toU64();
      balance.mana = newMana < balance.balance ? newMana : balance.balance;
      balance.last_mana_update = headBlockTime;
    }

    return balance;
  }


  increase_delegation(
    args: delegation.increase_delegation_arguments
  ): delegation.empty_message {
    this.consumeMana();

    System.require(args.from != null, '"from" is required');
    System.require(args.to != null, '"to" is required');

    const from = args.from!;
    const to = args.to!;
    const amount = args.amount;

    System.require(amount > 0, '"amount" must be > 0');

    const delegKey = new delegation.key(from, to);
    const deleg = this.delegationsFrom.get(delegKey)!;
    // create index if delegation did not exist
    const createIndex = deleg.amount == 0;

    // lock KOIN
    System.require(this.koinContract.transfer(from, this.contractId, amount), "could not lock KOIN");

    // update delegation
    deleg.amount += amount;

    this.delegationsFrom.put(delegKey, deleg);

    // add index to/from
    if (createIndex) {
      delegKey.account1 = to;
      delegKey.account2 = from;
      System.putBytes(this.delegationsToIndexSpace, Protobuf.encode(delegKey, delegation.key.encode), new Uint8Array(0));
    }

    // update mana balance
    const manaBalance = this.manaBalances.get(to)!;

    this.regenerateMana(manaBalance);

    manaBalance.balance += amount;
    manaBalance.mana += amount;

    this.manaBalances.put(to, manaBalance);

    return new delegation.empty_message();
  }

  decrease_delegation(
    args: delegation.decrease_delegation_arguments
  ): delegation.empty_message {
    this.consumeMana();

    System.require(args.from != null, '"from" is required');
    System.require(args.to != null, '"to" is required');

    const from = args.from!;
    const to = args.to!;
    const amount = args.amount;

    System.require(amount > 0, '"amount" must be > 0');

    const delegKey = new delegation.key(from, to);
    const deleg = this.delegationsFrom.get(delegKey)!;

    System.require(deleg.amount > amount, 'cannot decrease delegation');

    // undelegate tokens
    const undeleg = this.undelegations.get(from)!;
    undeleg.amount -= amount;

    this.processUndelegations(from, undeleg);

    deleg.amount -= amount;

    if (deleg.amount == 0) {
      // remove delegation if 0 mana delegated
      this.delegationsFrom.remove(delegKey);

      // remove index to/from
      delegKey.account1 = to;
      delegKey.account2 = from;
      System.removeObject(this.delegationsToIndexSpace, Protobuf.encode(delegKey, delegation.key.encode));
    } else {
      this.delegationsFrom.put(delegKey, deleg);
    }

    // update mana balance
    const manaBalance = this.manaBalances.get(to)!;

    this.regenerateMana(manaBalance);

    manaBalance.balance -= amount;
    manaBalance.mana -= amount;

    this.manaBalances.put(to, manaBalance);

    return new delegation.empty_message();
  }

  processUndelegations(account: Uint8Array, undeleg: delegation.balance): void {
    // get mana available in delegation contract
    const availableRc = System.getAccountRC(this.contractId);

    // calculate amount of KOIN that can be transfered
    const transferAmount = availableRc < undeleg.amount ? availableRc : undeleg.amount;

    // unlock KOIN
    System.require(this.koinContract.transfer(this.contractId, account, transferAmount), "could not unlock KOIN");

    // update undelegations
    undeleg.amount -= transferAmount;

    if (undeleg.amount > 0) {
      this.undelegations.put(account, undeleg);
    } else {
      this.undelegations.remove(account);
    }
  }

  process_undelegations(
    args: delegation.process_undelegations_arguments
  ): delegation.empty_message {
    this.consumeMana();

    System.require(args.account != null, '"account" is required');

    const account = args.account!;

    this.processUndelegations(account, this.undelegations.get(account)!);

    return new delegation.empty_message();
  }

  get_balance(args: delegation.get_balance_arguments): delegation.mana_balance {
    System.require(args.account != null, '"account" is required');
    const account = args.account!;

    const manaBalance = this.manaBalances.get(account)!;

    const meta = this.metadata.get()!;

    if (Arrays.equal(meta.last_mana_consumer, account)) {
      const headBlockTime = System.getHeadInfo().head_block_time;
      System.log(`before: ${manaBalance.mana.toString()}`);
      this.calculateConsumedMana(meta, manaBalance, headBlockTime);
      System.log(`after: ${manaBalance.mana.toString()}`);

    }

    if (manaBalance.balance > 0) {
      this.regenerateMana(manaBalance);
    }

    return manaBalance;
  }

  consume_mana(
    args: delegation.consume_mana_arguments
  ): delegation.empty_message {
    this.consumeMana();
    return  new delegation.empty_message();
  }

  get_metadata(
    args: delegation.get_metadata_arguments
  ): delegation.metadata_object {
    return this.metadata.get()!;
  }

  get_delegations_from(
    args: delegation.get_delegations_from_arguments
  ): delegation.get_delegations_result {
    System.require(args.account != null, '"account" is required');
    const account = args.account!;

    const res = new delegation.get_delegations_result();

    let delegationKey = new delegation.key(account, new Uint8Array(25).fill(0));

    let done = false;
    let deleg: System.ProtoDatabaseObject<delegation.balance> | null;
    let key: delegation.key;

    do {
      deleg = this.delegationsFrom.getNext(delegationKey);

      if (deleg) {
        key = Protobuf.decode<delegation.key>(deleg.key!, delegation.key.decode);

        if (Arrays.equal(key.account1, account)) {
          res.delegations.push(new delegation.balance_result(key.account2, deleg.value.amount));
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
    args: delegation.get_delegations_to_arguments
  ): delegation.get_delegations_result {
    System.require(args.account != null, '"account" is required');
    const account = args.account!;

    const res = new delegation.get_delegations_result();

    let currentKey = new delegation.key(account, new Uint8Array(25).fill(0));

    let done = false;
    let indexDelegation: system_calls.database_object | null;
    let deleg: delegation.balance;
    let indexKey: delegation.key;
    let delegationKey: delegation.key = new delegation.key();

    do {
      indexDelegation = System.getNextBytes(
        this.delegationsToIndexSpace,
        Protobuf.encode(currentKey, delegation.key.encode)
      );

      if (indexDelegation) {
        indexKey = Protobuf.decode<delegation.key>(indexDelegation.key!, delegation.key.decode);

        if (Arrays.equal(indexKey.account1, account)) {
          delegationKey.account1 = indexKey.account2;
          delegationKey.account2 = indexKey.account1;

          deleg = this.delegationsFrom.get(delegationKey)!;

          res.delegations.push(new delegation.balance_result(indexKey.account2, deleg.amount));
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
}
