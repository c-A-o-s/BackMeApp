import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-esteem-bar',
  templateUrl: './esteem-bar.component.html',
  styleUrls: ['./esteem-bar.component.css']
})
export class EsteemBarComponent implements OnInit {
  message: string;
  nickname: string;
  amount: string;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
    this.message = data.message;
    this.nickname = data.nickname;
    this.amount = data.amount;
  }

  ngOnInit() {
  }

}
