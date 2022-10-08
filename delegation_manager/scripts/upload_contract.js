const { Signer, Provider, Contract } = require('koilib');
const fs = require('fs');
const path = require('path');

const DELEGATION_MANAGER_CONTRACT_WIF = '5Jnox7AcaALyrgaLNahxBdop2nkMGodjHb2ZqF3sqA6QbQdiqGH';

const main = async () => {
  const provider = new Provider('https://api.koinosblocks.com');

  // private key for the delegation contract
  const signer = Signer.fromWif(DELEGATION_MANAGER_CONTRACT_WIF);
  signer.provider = provider;

  const contract = new Contract({
    id: signer.address,
    provider: signer.provider,
    signer,
    bytecode: fs.readFileSync(path.resolve(__dirname, '../build/release/contract.wasm'))
  });

  const { transaction, receipt } = await contract.deploy();

  console.log(receipt);

  await transaction.wait();
};

main()
  .catch(err => console.error(err));