import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsteemSendFormComponent } from './esteem-send-form.component';

describe('EsteemSendFormComponent', () => {
  let component: EsteemSendFormComponent;
  let fixture: ComponentFixture<EsteemSendFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsteemSendFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsteemSendFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
