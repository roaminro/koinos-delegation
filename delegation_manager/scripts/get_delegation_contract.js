const { Signer, Provider, Contract } = require('koilib');
const fs = require('fs');
const path = require('path');

const abi = require('../abi/delegation_manager_abi_js.json');
abi.koilib_types = abi.types;

const USER_ADDR = '18VpN36TGrssknBaAbA68nuZFMebN8QDro';
const USER_WIF = '5JzqV3V1SWZFWb6rCiHiR2qHnK8WHEtF11PvQLTmdTZN2tXfmrC';
const DELEGATION_MANAGER_CONTRACT_ADDR = '17sJgkemkXSs22LQtXseEMihMx2ipu8Lod';

const main = async () => {
  const provider = new Provider('https://api.koinosblocks.com');

  const delegationManagerContract = new Contract({
    id: DELEGATION_MANAGER_CONTRACT_ADDR,
    provider,
    abi
  });

  const { result } = await delegationManagerContract.functions.get_delegation_contract({
    address: USER_ADDR
  });

  console.log(result);
};

main()
  .catch(err => console.error(err));