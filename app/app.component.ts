import { Component, OnInit } from '@angular/core';
import { BackmeappService } from './backmeapp.service';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  webtree: boolean;
  nodesAvailable: boolean;
  isStream: boolean;
  isLoading: boolean;

  constructor(private router: Router, private backMeAppSvc: BackmeappService){
    this.webtree = false;
    this.nodesAvailable = false;
    this.isStream = false;
    this.isLoading = true;
  }

  ngOnInit() {
    this.backMeAppSvc.webThree.connect().then(r => {
      this.backMeAppSvc.backMeApp.loadContract();
      this.isLoading = false;
      this.nodesAvailable = r;
      this.webtree = true;
    }).catch(error => {
      this.isLoading = false;
      console.log(error);
    });

    this.router.events.subscribe(event => {
      if(event instanceof RoutesRecognized)
        this.isStream = event.url.includes("stream");
    });
  }
}
