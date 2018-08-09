import { Component, OnInit, OnDestroy, NgZone, Pipe, PipeTransform } from '@angular/core';
import { BackmeappService } from '../backmeapp.service';
import { MatDialog } from '@angular/material';
import { EtherboxPublishFormComponent } from '../etherbox-publish-form/etherbox-publish-form.component';

@Component({
  selector: 'app-my-contracts',
  templateUrl: './my-contracts.component.html',
  styleUrls: ['./my-contracts.component.css']
})
export class MyContractsComponent implements OnInit, OnDestroy {

  isLoading: boolean;
  etherBoxPublishedObservable: any;
  etherBoxDeletedObservable: any;
  etherBoxes: any[];

  constructor(
    public dialog: MatDialog,
    private backMeAppSvc: BackmeappService,
    private zone: NgZone) {
    this.etherBoxes = [];
    this.isLoading = true;
  }

  ngOnInit() {
    this.loadEtherBoxes();
    this.watchEvents({fromBlock:'latest', toBlock:'latest'});
  }

  ngOnDestroy() {
    this.etherBoxPublishedObservable.unsubscribe();
    this.etherBoxDeletedObservable.unsubscribe();
  }

  isPending(etherBox) {
    if(localStorage.getItem(etherBox.address) !== null) return true;
    else return false;
  }

  loadEtherBoxes() {
    this.backMeAppSvc.backMeApp.getMyEtherBoxes().then(etherBoxes => {
      this.zone.run(() => {
        this.etherBoxes =  etherBoxes;
        if (this.isLoading) this.isLoading = false;
      });
    });
  }

  onTabChange(event){
    this.loadEtherBoxes();
  }

  watchEvents(options) {
    this.etherBoxPublishedObservable = this.backMeAppSvc.etherBoxPublishedEvents(options).subscribe(event => {
      this.loadEtherBoxes();
    });

    this.etherBoxDeletedObservable = this.backMeAppSvc.etherBoxDeletedEvents(options).subscribe(event => {
      this.loadEtherBoxes();
    });
  }

  publishEtherBox() { this.dialog.open(EtherboxPublishFormComponent); }

}

@Pipe({name: 'expired'})
export class ExpiredPipe implements PipeTransform {
  transform(items: any[], expired: boolean) {
    if(!items) return [];
    return items.filter(r => expired ? r.expired : !r.expired);
  }
}
