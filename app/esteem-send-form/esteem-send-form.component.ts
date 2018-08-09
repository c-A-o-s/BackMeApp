import { Component, OnInit, Inject } from '@angular/core';
import { BackmeappService } from '../backmeapp.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BytesLengthErrorStateMatcher } from '../bytesLengthErrorStateMatcher';

@Component({
  selector: 'app-esteem-send-form',
  templateUrl: './esteem-send-form.component.html',
  styleUrls: ['./esteem-send-form.component.css']
})
export class EsteemSendFormComponent implements OnInit {

    nickname: string;
    message: string;
    amount: number;
    to: string;
    minEsteemAmount: number;
    gasPrice: number;
    gasEstimation: number;
    nicknameErrorStateMatcher: any;
    messageErrorStateMatcher: any;

    constructor(
      private backMeAppSvc: BackmeappService,
      @Inject(MAT_DIALOG_DATA) public data: any,
      public dialogRef: MatDialogRef<EsteemSendFormComponent>) {
      this.to = this.data.address;
      this.amount = 0.001;
      this.message = "";
      this.nickname = "";
      this.gasPrice = 1;
      this.gasEstimation = 1000;
      this.nicknameErrorStateMatcher = new BytesLengthErrorStateMatcher(32, this.backMeAppSvc);
      this.messageErrorStateMatcher = new BytesLengthErrorStateMatcher(300, this.backMeAppSvc);
    }

    ngOnInit() {
      this.backMeAppSvc.getAccountStatus().subscribe(accountStatus => {
        if(accountStatus.nickname.length > 0)
          this.nickname = accountStatus.nickname;
      });

      this.backMeAppSvc.backMeApp.getMinEsteemAmount().then(min => this.minEsteemAmount = min);
      this.getEstimation()
    }

    send() {
      this.backMeAppSvc.getAccountStatus().subscribe(account => {
        return this.backMeAppSvc.backMeApp.esteem(this.nickname, this.message, this.to, {value: this.amount, from: account.address, gasPrice: this.gasPrice}).then(r => {
            this.dialogRef.close();
        });
      });
    }

    getEstimation() {
      this.backMeAppSvc.getAccountStatus().subscribe(account => {
        return this.backMeAppSvc.backMeApp.esteemEstimateGas(this.nickname, this.message, this.to, {value: this.amount, from: account.address}).then(r => {
          this.gasPrice = r.gasPrice;
          this.gasEstimation = r.gas;
        });
      });
    }

    getBytesLegth(text) {
      return this.backMeAppSvc.byteLenghtOf(text);
    }

  }
