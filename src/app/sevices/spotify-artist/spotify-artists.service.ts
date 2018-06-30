import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tracks } from '../../models/track';
import { Albums } from '../../models/albums';
import { Artist, Artists } from '../../models/artists';
import { SpotifyPlaylistService } from '../spotify-playlist/spotify-playlist.service';

@Injectable()
export class SpotifyArtistsService extends SpotifyPlaylistService {

  private artistUrl = 'https://api.spotify.com/v1/artists/';
  userId: string;

  constructor(public http: HttpClient) {
    super( http );
    this.userId = localStorage.getItem('user');
  }

  public getArtistTopTracks(artistId: string): Observable<Tracks> {
    return this.http.get<Tracks>(this.artistUrl.concat(artistId).concat('/top-tracks?country=ES'));
    //  .pipe(map(resp => <Tracks>resp['tracks']));
  }

  public getArtistAlbums(artistId: string): Observable<Albums> {
    return this.http.get<Albums>(this.artistUrl.concat(artistId).concat('/albums'));
    // .pipe(map(resp => <Albums>resp));
  }

  public getArtistById(artistId: string): Observable<Artist> {
    return this.http.get<Artist>(this.artistUrl.concat(artistId)).pipe(map(resp => <Artist>resp));
  }
}
