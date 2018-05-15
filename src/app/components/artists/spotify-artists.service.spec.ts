import { TestBed, inject } from '@angular/core/testing';

import { SpotifyArtistsService } from './spotify-artists.service';

describe('SpotifyArtistsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyArtistsService]
    });
  });

  it('should be created', inject([SpotifyArtistsService], (service: SpotifyArtistsService) => {
    expect(service).toBeTruthy();
  }));
});
