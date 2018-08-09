import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavigatorComponent } from './navigator/navigator.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ContractStreamComponent } from './contract-stream/contract-stream.component';
import { ContractDetailsComponent } from './contract-details/contract-details.component';
import { MyContractsComponent, ExpiredPipe } from './my-contracts/my-contracts.component';
import { AppRoutingModule } from './app-routing.module';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RecentTransactionsComponent } from './recent-transactions/recent-transactions.component';
import { EsteemSendFormComponent } from './esteem-send-form/esteem-send-form.component';
import { EtherboxPublishFormComponent } from './etherbox-publish-form/etherbox-publish-form.component';
import { EsteemListComponent } from './esteem-list/esteem-list.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EsteemBarComponent } from './esteem-bar/esteem-bar.component';
import { EtherBoxSharingUrlDialogComponent } from './ether-box-sharing-url-dialog/ether-box-sharing-url-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigatorComponent,
    DashboardComponent,
    ContractDetailsComponent,
    MyContractsComponent,
    ContractStreamComponent,
    ExpiredPipe,
    RecentTransactionsComponent,
    EsteemSendFormComponent,
    EtherboxPublishFormComponent,
    EsteemListComponent,
    EsteemBarComponent,
    EtherBoxSharingUrlDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatTabsModule,
    MatExpansionModule,
    MatMenuModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatPaginatorModule,
    MatSnackBarModule
  ],

  entryComponents: [
    EtherboxPublishFormComponent,
    EsteemSendFormComponent,
    EsteemBarComponent,
    EtherBoxSharingUrlDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
