import { TestBed } from '@angular/core/testing';

import { Regions } from './regions';

describe('Regions', () => {
  let service: Regions;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Regions);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
