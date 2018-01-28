import { TestBed, inject } from '@angular/core/testing';

import { ClinicLocationService } from './clinic-location.service';

describe('ClinicLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClinicLocationService]
    });
  });

  it('should be created', inject([ClinicLocationService], (service: ClinicLocationService) => {
    expect(service).toBeTruthy();
  }));
});
