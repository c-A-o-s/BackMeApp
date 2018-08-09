import Contract from "./contract";
///////////////////////////////////////////////////////////////////////////////
export class BackMeApp extends Contract {
  constructor(address, abi, webThree) {
    super(address, abi, webThree);
  }
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getIsShutDown = function() {
  return new Promise((resolve, reject) => {
    this.contract.isShutDown.call((e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getMinEsteemAmount = function() {
  return new Promise((resolve, reject) => {
    this.contract.minEsteemAmount.call((e, r) => {
      if(e) reject(e);
      else resolve(this.webThree.weiToEther(r));
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getNickname = function(address) {
  return new Promise((resolve, reject) => {
    this.contract.nicknames.call(address, (e, r) => {
      if(e) reject(e);
      else resolve(this.webThree.hexToUtf8(r));
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getEtherBox = function(etherBoxAddress) {
  return new Promise((resolve, reject) => {
    this.contract.etherBoxes.call(etherBoxAddress, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getEtherBoxesList = function(ownerAddress) {
  return new Promise((resolve, reject) => {
    this.contract.getEtherBoxes.call(ownerAddress, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.isExpired = function(etherBoxAddress) {
  return new Promise((resolve, reject) => {
    this.contract.isExpired.call(etherBoxAddress, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getEsteemEvents = async function(options) {
  let eventFilter;
  try {
    eventFilter = this.contract.NewEsteem(options[0], options[1]);
  } catch(error) { console.log(error); }
  return eventFilter;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getEtherBoxPublishedEvents = async function(options) {
  let eventFilter;
  try {
    const defaultAddress = await this.webThree.getDefaultAccountAddress();
    eventFilter = this.contract.EtherBoxPublished({senderAddress: defaultAddress}, options);
  } catch(error) {
    eventFilter = this.contract.EtherBoxPublished({senderAddress: this.address}, options);
    console.log(error);
  }
  return eventFilter;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getEtherBoxDeletedEvents = async function(options) {
  let eventFilter;
  try {
    const defaultAddress = await this.webThree.getDefaultAccountAddress();
    eventFilter = this.contract.EtherBoxDeleted({senderAddress: defaultAddress}, options);
  } catch(error) {
    eventFilter = this.contract.EtherBoxDeleted({senderAddress: this.address}, options);
    console.log(error);
  }
  return eventFilter;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.buildEvent = async function(rawEvent) {
  let event = {};
  try {

    if(rawEvent.args.hasOwnProperty('senderNickname'))
      event.senderNickname = this.webThree.hexToUtf8(rawEvent.args.senderNickname);

    if(rawEvent.args.hasOwnProperty('etherBoxLabel'))
      event.etherBoxLabel = this.webThree.hexToUtf8(rawEvent.args.etherBoxLabel);

    if(rawEvent.args.hasOwnProperty('message'))
      event.message = rawEvent.args.message;

    if(rawEvent.args.hasOwnProperty('amount'))
      event.amount =  this.webThree.weiToEther(rawEvent.args.amount);

    event.timestamp =  String(rawEvent.args.timestamp*1000);
    event.senderAddress = rawEvent.args.senderAddress;
    event.etherBoxAddress = rawEvent.args.etherBoxAddress;
    event.event = rawEvent.event;
    event.transactionHash = rawEvent.transactionHash;
    event.blockNumber = rawEvent.blockNumber;
  } catch(error) { console.log(error); }
  return event;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.esteemEstimateGas = async function(nickname, message, to, options) {
  let transaction = {};
  let output = {gas: 0, gasPrice: 0};
  transaction.from = options.from;
  transaction.to = this.address;
  transaction.value = this.webThree.etherToWei(options.value);
  transaction.data = this.contract.esteem.getData(this.webThree.stringToHex(nickname), message, to);
  try {
    output.gasPrice = await this.webThree.getGasPrice();
    output.gas = await this.webThree.estimateGas(transaction);
  } catch(error) { console.log(error); }
  return output;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.buildEtherBoxEstimateGas = async function(label, url, lifespan, options) {
  let transaction = {};
  let output = {gas: 0, gasPrice: 0};
  transaction.from = options.from;
  transaction.to = this.address;
  transaction.value = this.webThree.etherToWei(options.value);
  transaction.data = this.contract.publishEtherBox.getData(label, url, lifespan);
  try {
    output.gasPrice = await this.webThree.getGasPrice();
    output.gas = await this.webThree.estimateGas(transaction);
  } catch(error) { console.log(error); }
  return output;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.deleteEtherBoxEstimateGas = async function(etherBoxAddress, options) {
  let transaction = {};
  let output = {gas: 0, gasPrice: 0};
  transaction.from = options.from;
  transaction.to = this.address;
  transaction.data = this.contract.deleteEtherBox.getData(etherBoxAddress);
  try {
    output.gasPrice  = await this.webThree.getGasPrice();
    output.gas = await this.webThree.estimateGas(transaction);
  } catch(error) { console.log(error); }
  return output;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.buildEtherBox = async function(etherBoxAddress) {
  const etherBox = {};
  try {
    const etherBoxRaw = await this.getEtherBox(etherBoxAddress);
    const expired = await this.isExpired(etherBoxAddress);
    etherBox.address = etherBoxAddress;
    etherBox.label = this.webThree.hexToUtf8(etherBoxRaw[0]);
    etherBox.owner = etherBoxRaw[1];
    etherBox.ownerUrl = etherBoxRaw[3];
    etherBox.expiration = parseInt(etherBoxRaw[2], 10) * 1000;
    etherBox.expired = expired;
  } catch(error) { console.log(error); }
  return etherBox;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.getMyEtherBoxes = async function() {
  const etherBoxes = [];
  try {
    const defaultAccountAddress = await this.webThree.getDefaultAccountAddress();
    const etherBoxesList = await this.getEtherBoxesList(defaultAccountAddress);
    const promises = [];
    etherBoxesList.forEach(etherBoxAddress => {
      promises.push(this.buildEtherBox(etherBoxAddress));
    });
    await Promise.all(promises).then(result => {
      result.forEach(etherBox => etherBoxes.push(etherBox));
    });
  } catch(error) { console.log(error); }
  return etherBoxes;
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.publishEtherBox = function(label, url, lifespan, options) {
  return new Promise((resolve, reject) => {
    label = this.webThree.stringToHex(label);
    options.value = this.webThree.etherToWei(options.value);
    this.contract.publishEtherBox(label, url, lifespan, options, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.esteem = function(nickname, message, to, options) {
  return new Promise((resolve, reject) => {
    nickname = this.webThree.stringToHex(nickname);
    options.value = this.webThree.etherToWei(options.value);
    this.contract.esteem(nickname, message, to, options, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
BackMeApp.prototype.deleteEtherBox = function(etherBoxAddress, options) {
  return new Promise((resolve, reject) => {
    this.contract.deleteEtherBox(etherBoxAddress, options, (e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
///////////////////////////////////////////////////////////////////////////////
