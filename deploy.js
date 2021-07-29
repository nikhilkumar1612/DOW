const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
  'call section hunt wave medal pet correct spoil maple fault vital clerk',
  'https://rinkeby.infura.io/v3/bd06000ca008441b869d24642017c4c0'
);
//const web3 = new Web3('http://localhost:8545');
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode})
    .send({ gas: '1000000', from: accounts[0] });
  console.log('Contract deployed to', result.options.address);
};
deploy();
