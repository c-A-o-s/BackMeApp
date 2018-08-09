import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyContractsComponent } from './my-contracts.component';

describe('MyContractsComponent', () => {
  let component: MyContractsComponent;
  let fixture: ComponentFixture<MyContractsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyContractsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
