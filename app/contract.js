export default class Contract {

  constructor(address, abi, webThree) {
    this._webThree = webThree;
    this._address = address;
    this._abi = abi;
    this._contract = null;
  }

  set address(val) { this._address = val; }
  get address() { return this._address; }

  set abi(val) { this._abi = val; }
  get abi() { return this._abi; }

  set contract(val) { this._contract = val; }
  get contract() { return this._contract; }
  get webThree() { return this._webThree; }

}
///////////////////////////////////////////////////////////////////////////////
Contract.prototype.loadContract = function() {
  this.contract = this.webThree.getContract(this.abi, this.address);
}
///////////////////////////////////////////////////////////////////////////////
Contract.prototype.getAllEvents = async function(options) {
  let eventFilter;
  try {
    eventFilter = this.contract.allEvents(options);
  } catch(error) { console.log(error); }
  return eventFilter;
}
///////////////////////////////////////////////////////////////////////////////
Contract.prototype.getOwner = function() {
  return new Promise((resolve, reject) => {
    this.contract.owner.call((e, r) => {
      if(e) reject(e);
      else resolve(r);
    });
  });
}
