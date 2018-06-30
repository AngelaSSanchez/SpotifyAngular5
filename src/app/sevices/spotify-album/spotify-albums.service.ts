import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tracks } from '../../models/track';
import { Albums, Album } from '../../models/albums';
import { SpotifyPlaylistService } from '../spotify-playlist/spotify-playlist.service';

@Injectable()
export class SpotifyAlbumsService extends SpotifyPlaylistService {

  private albumUrl = 'https://api.spotify.com/v1/albums/';

  constructor(public http: HttpClient) {
    super(http);
   }

  public getAlbumById(id: string): Observable<Album> {
    return this.http.get<Album>(this.albumUrl.concat(id)).pipe(map(resp => <Album>resp));
  }

  public getAlbumTracks(id: string): Observable<Tracks> {
    return this.http.get<Tracks>(this.albumUrl.concat(id).concat('/tracks'));
    // .pipe(map(resp => <Tracks>resp));
  }
}
