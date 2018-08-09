import { Component, OnInit } from '@angular/core';
import { BackmeappService } from '../backmeapp.service';
import { MatDialogRef } from '@angular/material';
import { BytesLengthErrorStateMatcher } from '../bytesLengthErrorStateMatcher';

@Component({
  selector: 'app-etherbox-publish-form',
  templateUrl: './etherbox-publish-form.component.html',
  styleUrls: ['./etherbox-publish-form.component.css']
})
export class EtherboxPublishFormComponent implements OnInit {

  label: string;
  ownerUrl: string;
  lifespan: number;
  tip: number;
  labelErrorStateMatcher: any;
  urlErrorStateMatcher: any;
  gasEstimation: number;
  gasPrice: number;

  constructor(
    private backMeAppSvc: BackmeappService,
    public dialogRef: MatDialogRef<EtherboxPublishFormComponent>) {
    this.label = "";
    this.ownerUrl = "";
    this.lifespan = 60;
    this.tip = 0;
    this.labelErrorStateMatcher = new BytesLengthErrorStateMatcher(32, this.backMeAppSvc);
    this.urlErrorStateMatcher = new BytesLengthErrorStateMatcher(200, this.backMeAppSvc);
    this.gasEstimation = 0;
    this.gasPrice = 0;
  }

  ngOnInit() {
    this.getEstimation();
  }

  send() {
    this.backMeAppSvc.getAccountStatus().subscribe(account => {
      this.backMeAppSvc.backMeApp.publishEtherBox(this.label, this.ownerUrl, this.lifespan*60, {value: this.tip, from: account.address, gasPrice: this.gasPrice}).then(r => {
          this.dialogRef.close();
      });
    });
  }

  getBytesLegth(text) {
    return this.backMeAppSvc.byteLenghtOf(text);
  }

  getEstimation() {
    this.backMeAppSvc.getAccountStatus().subscribe(account => {
      this.backMeAppSvc.backMeApp.buildEtherBoxEstimateGas(this.label, this.ownerUrl, this.lifespan*60, {value: this.tip, from: account.address}).then(r => {
        this.gasPrice = r.gasPrice;
        this.gasEstimation = r.gas;
      });
    });
  }

}
