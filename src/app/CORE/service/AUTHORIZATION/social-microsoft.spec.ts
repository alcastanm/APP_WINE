import { TestBed } from '@angular/core/testing';

import { SocialMicrosoft } from './social-microsoft';

describe('SocialMicrosoft', () => {
  let service: SocialMicrosoft;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialMicrosoft);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
