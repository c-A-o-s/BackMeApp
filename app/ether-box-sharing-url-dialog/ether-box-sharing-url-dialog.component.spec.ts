import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtherBoxSharingUrlDialogComponent } from './ether-box-sharing-url-dialog.component';

describe('EtherBoxSharingUrlDialogComponent', () => {
  let component: EtherBoxSharingUrlDialogComponent;
  let fixture: ComponentFixture<EtherBoxSharingUrlDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherBoxSharingUrlDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherBoxSharingUrlDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
