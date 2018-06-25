import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tracks } from '../../models/track';
import { Albums } from '../../models/albums';
import { Artist } from '../../models/artists';
import { SpotifyPlaylistService } from '../spotify-playlist/spotify-playlist.service';

@Injectable()
export class SpotifyArtistsService extends SpotifyPlaylistService {

  private artistUrl = 'https://api.spotify.com/v1/artists/';
  userId: string;

  constructor(public http: HttpClient) {
    super( http );
    this.userId = localStorage.getItem('user');
  }

  public getArtistTopTracks(id: string): Observable<Tracks> {
    return this.http.get(this.artistUrl.concat(id).concat('/top-tracks?country=ES')).pipe(map(resp => <Tracks>resp));
  }

  public getArtistAlbums(id: string): Observable<Albums> {
    return this.http.get(this.artistUrl.concat(id).concat('/albums')).pipe(map(resp => <Albums>resp));
  }

  public getArtistById(id: string): Observable<Artist> {
    return this.http.get(this.artistUrl.concat(id)).pipe(map(resp => <Artist>resp));
  }

  public followArtists(id: string) {
    return this.http.put('https://api.spotify.com/v1/me/following?type=artist&ids=' + id, null);
  }

  public checkFollowingArtist(id: string) {
    return this.http.get('https://api.spotify.com/v1/me/following/contains?type=artist&ids=' + id);
  }

  public unfollowArtists(id: string) {
    return this.http.delete('https://api.spotify.com/v1/me/following?type=artist&ids=' + id);
  }
}
