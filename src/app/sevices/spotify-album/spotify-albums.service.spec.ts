import { TestBed, inject } from '@angular/core/testing';

import { SpotifyAlbumsService } from './spotify-albums.service';

describe('SpotifyAlbumsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyAlbumsService]
    });
  });

  it('should be created', inject([SpotifyAlbumsService], (service: SpotifyAlbumsService) => {
    expect(service).toBeTruthy();
  }));
});
