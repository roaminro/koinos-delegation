const { Signer, Provider, Contract } = require('koilib');
const fs = require('fs');
const path = require('path');

const abi = require('../abi/delegation_manager_abi_js.json');
abi.koilib_types = abi.types;

const USER_ADDR = '18VpN36TGrssknBaAbA68nuZFMebN8QDro';
const DELEGATION_CONTRACT_WIF = '5KgE5Tfm7zuJ6q6tnUJVW93dCDiDDk5mgaffrRJSdwg5hQbDHGK';
const DELEGATION_MANAGER_CONTRACT_ADDR = '17sJgkemkXSs22LQtXseEMihMx2ipu8Lod';

const main = async () => {
  const provider = new Provider('https://api.koinosblocks.com');

  // private key for the delegation contract
  const signer = Signer.fromWif(DELEGATION_CONTRACT_WIF);
  signer.provider = provider;

  const delegationContract = new Contract({
    id: signer.address,
    provider,
    signer,
    bytecode: fs.readFileSync(path.resolve(__dirname, '../../delegation/build/release/contract.wasm'))
  });

  const { operation: uploadOperation } = await delegationContract.deploy({
    authorizesTransactionApplication: true,
    authorizesUploadContract: true,
    authorizesCallContract: true,
    signTransaction: false,
    sendTransaction: false
  });

  const delegationManagerContract = new Contract({
    id: DELEGATION_MANAGER_CONTRACT_ADDR,
    provider,
    signer,
    abi
  });

  const { operation: registerOperation } = await delegationManagerContract.functions.register_delegation_contract({
    address: USER_ADDR
  }, {
    signTransaction: false,
    sendTransaction: false
  });

  const preparedTx = await signer.prepareTransaction({ operations: [
    uploadOperation,
    registerOperation,
  ]});

  const { transaction, receipt } = await signer.sendTransaction(preparedTx);

  console.log(receipt);

  await transaction.wait();
};

main()
  .catch(err => console.error(err));