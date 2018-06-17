import { TestBed, inject } from '@angular/core/testing';

import { SpotifyLoginService } from './spotify-login.service';

describe('SpotifyLoginService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyLoginService]
    });
  });

  it('should be created', inject([SpotifyLoginService], (service: SpotifyLoginService) => {
    expect(service).toBeTruthy();
  }));
});
