import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tracks } from '../track';
import { Albums } from '../albums';

@Injectable()
export class SpotifyArtistsService {

  private baseUrl = 'https://api.spotify.com/v1/artists/';

  constructor(public http: HttpClient) { }

  public getArtistTopTracks(id: string): Observable<Tracks> {
    return this.http.get(this.baseUrl.concat(id).concat('/top-tracks?country=ES')).pipe(map(resp => <Tracks>resp));
  }
  public getArtistAlbums(id: string): Observable<Albums> {
    return this.http.get(this.baseUrl.concat(id).concat('/albums')).pipe(map(resp => <Albums>resp));
  }

  public followArtists(id: string) {
    return this.http.put('https://api.spotify.com/v1/me/following?type=artist&ids=' + id, null).subscribe(resp => resp);
  }
}
