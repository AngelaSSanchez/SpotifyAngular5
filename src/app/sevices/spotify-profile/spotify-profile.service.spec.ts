import { TestBed, inject } from '@angular/core/testing';

import { SpotifyProfileService } from './spotify-profile.service';

describe('SpotifyProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyProfileService]
    });
  });

  it('should be created', inject([SpotifyProfileService], (service: SpotifyProfileService) => {
    expect(service).toBeTruthy();
  }));
});
