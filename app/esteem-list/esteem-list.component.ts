import { Component, OnInit, OnDestroy, NgZone, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { BackmeappService } from '../backmeapp.service';

@Component({
  selector: 'app-esteem-list',
  templateUrl: './esteem-list.component.html',
  styleUrls: ['./esteem-list.component.css']
})
export class EsteemListComponent implements OnInit {
  @Input() etherBoxAddress: string;
  esteemEventsObservable: any;
  dataSource: any;
  transactions: any[];

  constructor(private backMeAppSvc: BackmeappService, private zone: NgZone) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit() {
    this.watchEsteemEvents([{etherBoxAddress:this.etherBoxAddress},{fromBlock:5755454, toBlock:'latest'}]);
    this.transactions = [];
    this.dataSource = new MatTableDataSource(this.transactions);
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.esteemEventsObservable.unsubscribe();
  }

  displayedColumns = ['time', 'message'];

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

  watchEsteemEvents(options) {
    this.esteemEventsObservable = this.backMeAppSvc.esteemEvents(options).subscribe(event => {
      this.transactions.unshift(event);
      this.updateTable();
    });
  }

  updateTable() {
    this.zone.run(() => {
      this.dataSource = new MatTableDataSource(this.transactions);
      this.dataSource.paginator = this.paginator;
    });
  }

}
