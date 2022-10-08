import { authority, Base58, Arrays } from "@koinos/sdk-as";

const DELEGATION_MANAGER_CONTRACT_ID = '17sJgkemkXSs22LQtXseEMihMx2ipu8Lod';

export class Delegation {
  authorize(args: authority.authorize_arguments): authority.authorize_result {
    switch (args.type) {
      case authority.authorization_type.contract_upload:
        // TODO: remove access to contract upload
        return new authority.authorize_result(true);

      case authority.authorization_type.contract_call:
        // only the DELEGATION_MANAGER_CONTRACT_ID is allowed to perform contract calls
        return new authority.authorize_result(Arrays.equal(args.call!.caller, Base58.decode(DELEGATION_MANAGER_CONTRACT_ID)));

      case authority.authorization_type.transaction_application:
        // TODO: call delegation manager contract to authorize mana consumption
        return new authority.authorize_result(true);

      default:
        return new authority.authorize_result(false);
    }
  }
}
