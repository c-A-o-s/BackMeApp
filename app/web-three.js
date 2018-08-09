///////////////////////////////////////////////////////////////////////////////
export default class WebThree {

  constructor() { this._web3 = window.web3; }

  set web3(val) { this._web3 = val; }
  get web3() { return this._web3; }

  async connect() {
    if(typeof this.web3 !== 'undefined') this.web3 = new Web3(this.web3.currentProvider);
    else this.web3 = undefined;

    try {
      this.network = await this.getNetwork();
      this.peerCount = await this.getPeerCount();
    } catch(error) { console.log(error); }

    return this.peerCount > 0 ? true : false;
  }
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getBlockchainStatus = async function() {
  let blockchainStatus = {};
  try {
    blockchainStatus.gasPrice = await this.getGasPrice();
    blockchainStatus.node = await this.getPeerCount();
    blockchainStatus.network = await this.getNetwork();
    switch(blockchainStatus.network) {
      case '1': blockchainStatus.network = ''; break;
      case '3': blockchainStatus.network = 'ropsten'; break;
      case '4': blockchainStatus.network = 'rinkeby'; break;
      case '42': blockchainStatus.network = 'kovan'; break;
      default:  blockchainStatus.network = blockchainStatus.network;
    }
  } catch(error) { console.log(error) }
  return blockchainStatus;
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getDefaultAccount = async function() {
  let defaultAccount = {};
  try {
    defaultAccount.address = await this.getDefaultAccountAddress();
    defaultAccount.balance = await this.getBalance(defaultAccount.address);
  } catch(error) {
    defaultAccount.address = "0x0";
    defaultAccount.balance = 0;
    console.log(error)
  }
  return defaultAccount;
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getDefaultAccountAddress = function() {
  return new Promise((resolve, reject) => {
    this.web3.eth.getAccounts((e, r) => {
      if(e) reject(e);
      if(r.length < 1) reject("No Accounts available.");
      else resolve(r[0]);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getBalance = function(accountAddress) {
  return new Promise((resolve, reject) => {
    this.web3.eth.getBalance(accountAddress, (e, r) => {
      if(e) reject(e);
      else resolve(this.weiToEther(r));
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.stringToHex = function(text) {
  if(text.length == 0) return "";
  let output = "0x";
  const textEncoder = new TextEncoder('utf-8');
  const uint8Array = textEncoder.encode(text);
  uint8Array.forEach(char => {
    output += Number(char).toString(16);
  });
  return output;
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.stringByteLength = function(text) {
  if(text.length == 0) return 0;
  const textEncoder = new TextEncoder('utf-8');
  return textEncoder.encode(text).byteLength;
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.hexToUtf8 = function(hex) {
  return this.web3.toUtf8(hex);
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.weiToEther = function(weiAmount) {
  return this.web3.fromWei(weiAmount, "ether");
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.etherToWei = function(etherAmount) {
  return this.web3.toWei(etherAmount, "ether");
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.weiToGwei = function(weiAmount) {
  return Math.ceil(parseInt(weiAmount, 10) / Math.pow(10, 9));
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.gweiToWei = function(gweiAmount) {
  return Math.ceil(parseInt(gweiAmount, 10) * Math.pow(10, 9));
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.estimateGas = function(transaction) {
  return new Promise((resolve, reject) => {
    this.web3.eth.estimateGas(transaction, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.isValidAddress = function(address) {
  return this.web3.isAddress(address);
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getGasPrice = function(weiOrGwei) {
  weiOrGwei || false;
  return new Promise((resolve, reject) => {
    this.web3.eth.getGasPrice((e, r) => {
      if(e) reject(e);
      else {
        if(parseInt(r, 10) < Math.pow(10,9)) r = Math.pow(10,9)
        if(weiOrGwei) resolve(weiToGwei(r));
        else resolve(r)
      }
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getNetwork = function() {
  return new Promise((resolve, reject) => {
    this.web3.version.getNetwork((e, r) => {
      if(e) reject(e);
      else resolve(r); //1:main,2:deprecated,3:ropsten,4:rinkeby,42:kovan
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getPeerCount = function() {
  return new Promise((resolve, reject) => {
    this.web3.net.getPeerCount((e, r) => {
      if(e) reject(e);
      if(typeof r === 'undefined') reject("Disconnected");
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getBlockNumber = function() {
  return new Promise((resolve, reject) => {
    this.web3.eth.getBlockNumber((e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getTransaction = function(txHash) {
  return new Promise((resolve, reject) => {
    this.web3.eth.getTransaction(txHash, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
WebThree.prototype.getContract = function(abi, address) {
  return this.web3.eth.contract(abi).at(address);
}
///////////////////////////////////////////////////////////////////////////////
