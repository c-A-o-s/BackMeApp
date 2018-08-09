import { TestBed, inject } from '@angular/core/testing';

import { BackmeappService } from './backmeapp.service';

describe('BackmeappService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackmeappService]
    });
  });

  it('should be created', inject([BackmeappService], (service: BackmeappService) => {
    expect(service).toBeTruthy();
  }));
});
