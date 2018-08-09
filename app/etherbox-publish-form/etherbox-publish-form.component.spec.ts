import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtherboxPublishFormComponent } from './etherbox-publish-form.component';

describe('EtherboxPublishFormComponent', () => {
  let component: EtherboxPublishFormComponent;
  let fixture: ComponentFixture<EtherboxPublishFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtherboxPublishFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtherboxPublishFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
