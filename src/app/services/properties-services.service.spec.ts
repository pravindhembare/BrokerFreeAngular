import { TestBed } from '@angular/core/testing';

import { PropertiesServicesService } from './properties-services.service';

describe('PropertiesServicesService', () => {
  let service: PropertiesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertiesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
