import { Component, OnInit, OnDestroy, NgZone, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BackmeappService } from '../backmeapp.service';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrls: ['./recent-transactions.component.css']
})
export class RecentTransactionsComponent implements OnInit, OnDestroy {

  eventsFilterObservable: any;
  dataSource: any;
  transactions: any[];

  constructor(private backMeAppSvc: BackmeappService, private zone: NgZone) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.watchAllEvents({fromBlock:5755454, toBlock:'latest'});
    this.transactions = [];
    this.dataSource = new MatTableDataSource(this.transactions);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.eventsFilterObservable.unsubscribe();
  }

  displayedColumns = ['time', 'from', 'action', 'to'];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  watchAllEvents(options) {
    this.backMeAppSvc.blockNumber().then(bn => {
      options.fromBlock = bn-500;
      this.eventsFilterObservable = this.backMeAppSvc.allEvents(options).subscribe(event => {
        this.transactions.unshift(event);
        this.updateTable();
      });
    });

  }

  updateTable() {
    this.zone.run(() => {
      this.dataSource = new MatTableDataSource(this.transactions);
      this.dataSource.paginator = this.paginator;
    });
  }

}
