import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-ether-box-sharing-url-dialog',
  templateUrl: './ether-box-sharing-url-dialog.component.html',
  styleUrls: ['./ether-box-sharing-url-dialog.component.css']
})
export class EtherBoxSharingUrlDialogComponent implements OnInit {
  etherBoxUrl: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.etherBoxUrl = this.data.url;
  }

  ngOnInit() {
  }

}
