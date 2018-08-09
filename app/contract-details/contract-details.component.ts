import { Component, OnInit, OnDestroy, NgZone, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BackmeappService } from '../backmeapp.service';
import { MatDialog } from '@angular/material';
import { EsteemSendFormComponent } from '../esteem-send-form/esteem-send-form.component';
import { DOCUMENT }  from '@angular/platform-browser';
import { EtherBoxSharingUrlDialogComponent } from '../ether-box-sharing-url-dialog/ether-box-sharing-url-dialog.component';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.css']
})
export class ContractDetailsComponent implements OnInit, OnDestroy {

  address: any;
  isLoading: any;
  etherBox: any;
  ownerAddress: any;
  ownerUrl: any;
  expiration: any;
  etherBoxLabel: any;
  isExpired: any;
  etherBoxDeletedObservable: any;
  isOwner: any;

  constructor(
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document,
    private backMeAppSvc: BackmeappService,
    public dialog: MatDialog,
    private zone: NgZone) {
    this.address = this.route.snapshot.paramMap.get('address');
    this.isLoading = true;
    this.isExpired = true;
    this.isOwner = false;
  }

  ngOnInit() {
    this.loadInfo();
    this.watchEtherBoxDeleted({fromBlock:'latest', toBlock:'latest'});
  }

  ngOnDestroy() {
    this.etherBoxDeletedObservable.unsubscribe();
  }

  loadInfo(){
    this.backMeAppSvc.backMeApp.buildEtherBox(this.address)
    .then(etherBox => {
      this.backMeAppSvc.getAccountStatus().subscribe(account => {
        this.zone.run(() => {
          this.etherBox = etherBox;
          this.ownerAddress = etherBox.owner;
          this.ownerUrl = etherBox.ownerUrl;
          this.expiration = etherBox.expiration;
          this.etherBoxLabel = etherBox.label;
          this.isExpired = etherBox.expired;
          this.isLoading = false;
          this.isOwner = etherBox.owner == account.address ? true : false;
        });
      });
    });
  }

  deleteEtherBox() {
    this.backMeAppSvc.getAccountStatus().subscribe(account => {
      this.backMeAppSvc.backMeApp.deleteEtherBoxEstimateGas(this.address, {from:account.address}).then(r => {
        return this.backMeAppSvc.backMeApp.deleteEtherBox(this.address, {gasPrice: r.gasPrice, from: account.address, gas: r.gas});
      }).then(txHash => {
          localStorage.setItem(this.address, txHash);
      });
    });
  }

  watchEtherBoxDeleted(options) {
    this.etherBoxDeletedObservable = this.backMeAppSvc.etherBoxDeletedEvents(options).subscribe(event => {
      this.loadInfo();
    });
  }

  showEtherBoxUrl(){
    this.dialog.open(EtherBoxSharingUrlDialogComponent, {data: {url:document.location.href}});
  }

  esteem() { this.dialog.open(EsteemSendFormComponent, {data: {address: this.address}}); }
}
