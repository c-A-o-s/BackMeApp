import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsteemBarComponent } from './esteem-bar.component';

describe('EsteemBarComponent', () => {
  let component: EsteemBarComponent;
  let fixture: ComponentFixture<EsteemBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsteemBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsteemBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
