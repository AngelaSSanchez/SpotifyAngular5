import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tracks } from '../../models/track';
import { Albums } from '../../models/albums';
import { SpotifyProfileService } from '../spotify-profile/spotify-profile.service';

@Injectable()
export class SpotifyArtistsService extends SpotifyProfileService {

  private artistUrl = 'https://api.spotify.com/v1/artists/';

  constructor(public http: HttpClient) {
    super( http );
  }

  public getArtistTopTracks(id: string): Observable<Tracks> {
    return this.http.get(this.artistUrl.concat(id).concat('/top-tracks?country=ES')).pipe(map(resp => <Tracks>resp));
  }
  public getArtistAlbums(id: string): Observable<Albums> {
    return this.http.get(this.artistUrl.concat(id).concat('/albums')).pipe(map(resp => <Albums>resp));
  }

  public followArtists(id: string) {
    return this.http.put('https://api.spotify.com/v1/me/following?type=artist&ids=' + id, null).subscribe(resp => resp);
  }
}
