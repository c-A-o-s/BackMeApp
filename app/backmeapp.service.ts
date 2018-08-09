import { Injectable } from '@angular/core';
import { BackMeApp } from './contract-api';
import * as contractList from './contract-list';
import WebThree from "./web-three";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackmeappService {
  backMeApp: BackMeApp;
  webThree: WebThree;

  constructor() {
    this.webThree = new WebThree();
    this.backMeApp = new BackMeApp(contractList.contract_1.address, contractList.contract_1.abi, this.webThree);
  }

  allEvents(options) {
    return new Observable<any>(observer => {
      let events;
      this.backMeApp.getAllEvents(options)
      .then(eventFilter => {
        events = eventFilter;
        events.watch((error, result) => {
          if(!error)
          this.backMeApp.buildEvent(result).then(r => observer.next(r))
        });
      });

      return {unsubscribe() { events.stopWatching() }};
    });
  }

  esteemEvents(options) {
    return new Observable<any>(observer => {
      let events;
      this.backMeApp.getEsteemEvents(options)
      .then(eventFilter => {
        events = eventFilter;
        events.watch((error, result) => {
          if(!error)
            this.backMeApp.buildEvent(result).then(r => observer.next(r));
        });
      });

      return {unsubscribe() { events.stopWatching() }};
    });
  }

  etherBoxPublishedEvents(options) {
    return new Observable<any>(observer => {
      let events;
      this.backMeApp.getEtherBoxPublishedEvents()
      .then(eventFilter => {
        events = eventFilter;
        events.watch((error, result) => {
          if(!error)
            this.backMeApp.buildEvent(result).then(r => observer.next(r));
        });
      });

      return {unsubscribe() { events.stopWatching() }};
    });
  }

  etherBoxDeletedEvents(options) {
    return new Observable<any>(observer => {
      let events;
      this.backMeApp.getEtherBoxDeletedEvents(options)
      .then(eventFilter => {
        events = eventFilter;
        events.watch((error, result) => {
          if(!error)
            this.backMeApp.buildEvent(result).then(r => observer.next(r));
        });
      });

      return {unsubscribe() { events.stopWatching() }};
    });
  }

  getAccountStatus() {
    return new Observable<any>(observer => {
      let accountStatus = {address:'', balance:0, nickname:'', gasPrice:0, network:'', node:''};

      this.backMeApp.webThree.getDefaultAccount().then(account => {
        accountStatus.address = account.address;
        accountStatus.balance = account.balance;
        return this.backMeApp.getNickname(account.address);
      }).then(nickname => {
        accountStatus.nickname = nickname;
        return this.backMeApp.webThree.getBlockchainStatus();
      }).then(blockchainStatus => {
        accountStatus.gasPrice = blockchainStatus.gasPrice;
        accountStatus.network = blockchainStatus.network;
        accountStatus.node = blockchainStatus.node;
        observer.next(accountStatus);
        observer.complete();
      }).catch(error => console.log(error));

      return {unsubscribe() { }};
    });
  }

  isValidAddress(address){
    return this.backMeApp.webThree.isValidAddress(address);
  }

  byteLenghtOf(text) {
    return this.backMeApp.webThree.stringByteLength(text);
  }

  blockNumber(){
    return this.backMeApp.webThree.getBlockNumber();
  }


}
