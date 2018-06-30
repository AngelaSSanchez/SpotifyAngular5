import { TestBed, inject } from '@angular/core/testing';

import { SpotifyFollowService } from './spotify-follow.service';

describe('SpotifyFollowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotifyFollowService]
    });
  });

  it('should be created', inject([SpotifyFollowService], (service: SpotifyFollowService) => {
    expect(service).toBeTruthy();
  }));
});
