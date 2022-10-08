const { Signer, Provider, Contract, utils } = require('koilib');

const USER_WIF = '5Hs4H2Ks2EyFZTMxkQprC5t54Xw5LRDoHRfyjedNNBJC4jcM1nU';
const DELEGATION_CONTRACT_ADDR = '1LrDAuFejtNGnVuVhyrMgLo7N7XnUz12DK';

const main = async () => {
  const provider = new Provider('https://api.koinosblocks.com');
  // private key of the account that wants to use the delegation contract
  const signer = Signer.fromWif(USER_WIF);
  signer.provider = provider;

  const koinContract = new Contract({
    id: '19JntSm8pSNETT9aHTwAUHC5RMoaSmgZPJ',
    abi: utils.tokenAbi,
    provider,
    signer,
  });

  const koin = koinContract.functions;

  const { transaction, receipt } = await koin.transfer({
    from: signer.address,
    to: '18VpN36TGrssknBaAbA68nuZFMebN8QDro',
    value: '1',
  }, {
    payer: DELEGATION_CONTRACT_ADDR,
    payee: signer.address,
  });

  console.log(transaction, receipt);

  await transaction.wait();
};

main()
  .catch(err => console.error(err));