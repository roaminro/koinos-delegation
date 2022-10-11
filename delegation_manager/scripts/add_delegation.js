const { Signer, Provider, Contract, utils } = require('koilib');
const abi = require('../abi/delegation_manager_abi_js.json');
abi.koilib_types = abi.types;

const USER_WIF = '5JzqV3V1SWZFWb6rCiHiR2qHnK8WHEtF11PvQLTmdTZN2tXfmrC';
const DELEGATION_MANAGER_CONTRACT_ADDR = '17sJgkemkXSs22LQtXseEMihMx2ipu8Lod';

const main = async () => {
  const provider = new Provider('https://api.koinosblocks.com');
  // private key of the account that wants to use the delegation contract
  const signer = Signer.fromWif(USER_WIF);
  signer.provider = provider;

  const delegationManagerContract = new Contract({
    id: DELEGATION_MANAGER_CONTRACT_ADDR,
    abi,
    provider,
    signer,
  });

  // const { transaction, receipt } = await delegationManagerContract.functions.add_delegation({
  //   from: '18VpN36TGrssknBaAbA68nuZFMebN8QDro',
  //   to: '1EVnUPiUXLdymLHzubdgvUpVdxGPh8Kr6r',
  //   amount: '1'
  // });

  // const { transaction, receipt } = await delegationManagerContract.functions.add_delegation({
  //   from: '1EVnUPiUXLdymLHzubdgvUpVdxGPh8Kr6r',
  //   to: '18VpN36TGrssknBaAbA68nuZFMebN8QDro',
  //   amount: '10'
  // });

  const { transaction, receipt } = await delegationManagerContract.functions.add_delegation({
    from: '1EVnUPiUXLdymLHzubdgvUpVdxGPh8Kr6r',
    to: '14b3WXsEfmdvLdaYkzAF8jLhbz57mTnYbk',
    amount: '100'
  });

  console.log(transaction, receipt);

  await transaction.wait();
};

main()
  .catch(err => console.error(err));