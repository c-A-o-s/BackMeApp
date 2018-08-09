import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractStreamComponent } from './contract-stream.component';

describe('ContractStreamComponent', () => {
  let component: ContractStreamComponent;
  let fixture: ComponentFixture<ContractStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContractStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
