import { Component, OnInit, OnDestroy } from '@angular/core';
import { EsteemBarComponent } from '../esteem-bar/esteem-bar.component';
import { BackmeappService } from '../backmeapp.service';
import { ActivatedRoute } from '@angular/router';
import { interval } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-contract-stream',
  templateUrl: './contract-stream.component.html',
  styleUrls: ['./contract-stream.component.css']
})
export class ContractStreamComponent implements OnInit, OnDestroy {

  etherBoxAddress: string;
  esteemEventsObservable: any;
  transactions: any[];
  timer: any;
  lastBlockRead: any;

  constructor(private backMeAppSvc: BackmeappService, private route: ActivatedRoute, public snackBar: MatSnackBar) {
    this.etherBoxAddress = this.route.snapshot.paramMap.get('address');
    this.lastBlockRead = localStorage.getItem(this.etherBoxAddress) || '0';
    this.watchEsteemEvents([{etherBoxAddress:this.etherBoxAddress},{fromBlock:this.lastBlockRead, toBlock:'latest'}]);
    this.transactions = [];
  }

  ngOnInit() {
    this.timer = interval(5000);
    this.timer.subscribe(r => {
      if(this.transactions.length > 0){
        let t = this.transactions[0];
        this.snackBar.openFromComponent(EsteemBarComponent,{
          data:{ message:t.message, nickname:t.senderNickname, amount: t.amount },
          duration:5000,
          horizontalPosition:'center',
          verticalPosition:'top'});
        localStorage.setItem(this.etherBoxAddress, t.blockNumber+1);
        this.transactions.shift();
      }
    });
  }

  ngOnDestroy() {this.esteemEventsObservable.unsubscribe();}

  watchEsteemEvents(options) {
    this.esteemEventsObservable = this.backMeAppSvc.esteemEvents(options).subscribe(event => {
      this.transactions.push(event);
    });
  }
}
