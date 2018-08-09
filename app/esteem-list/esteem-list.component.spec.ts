import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsteemListComponent } from './esteem-list.component';

describe('EsteemListComponent', () => {
  let component: EsteemListComponent;
  let fixture: ComponentFixture<EsteemListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsteemListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsteemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
