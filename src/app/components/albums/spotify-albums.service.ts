import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tracks } from '../../models/track';
import { Albums, Album } from '../../models/albums';

@Injectable()
export class SpotifyAlbumsService {

  private baseUrl = 'https://api.spotify.com/v1/albums/';

  constructor(public http: HttpClient) { }

  public getAlbumById(id: string): Observable<Album> {
    return this.http.get(this.baseUrl.concat(id)).pipe(map(resp => <Album>resp));
  }

  public getAlbumTracks(id: string): Observable<Tracks> {
    return this.http.get(this.baseUrl.concat(id).concat('/tracks')).pipe(map(resp => <Tracks>resp));
  }
}
