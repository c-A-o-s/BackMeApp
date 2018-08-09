import { Component, OnInit, ViewChild } from '@angular/core';
import { BackmeappService } from '../backmeapp.service';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-navigator',
  templateUrl: './navigator.component.html',
  styleUrls: ['./navigator.component.css']
})
export class NavigatorComponent implements OnInit {

  defaultAccountAddress: string;
  defaultAccountBalance: string;
  defaultAccountNickname: string;
  selectedNetwork: string;
  isLoading: boolean;

  constructor(private backMeAppSvc: BackmeappService) {
    this.isLoading = true;
  }

  ngOnInit() {
    //this.updateDefaultAccount();
  }

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  open() {
    this.updateDefaultAccount();
    this.trigger.openMenu();
  }

  updateDefaultAccount() {
    this.backMeAppSvc.getAccountStatus().subscribe(accountStatus => {
      this.defaultAccountAddress = accountStatus.address;
      this.defaultAccountBalance = accountStatus.balance;
      this.selectedNetwork = accountStatus.network;
      this.defaultAccountNickname = accountStatus.nickname;
      this.isLoading = false;
    });
  }
}
