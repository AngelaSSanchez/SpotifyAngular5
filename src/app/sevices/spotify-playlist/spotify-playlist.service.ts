import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Playlist, Playlists } from '../../models/playlist';
import { Tracks } from '../../models/track';

@Injectable()
export class SpotifyPlaylistService {

  userId: string;
  baseUrl: string;

  constructor(public http: HttpClient) {
    this.userId = localStorage.getItem('user');
    this.baseUrl = ('https://api.spotify.com/v1/users/').concat(this.userId).concat('/playlists');
  }

  public getPlaylists(): Observable<Playlists> {
    return this.http.get<Playlists>(this.baseUrl);
  }

  public getPlaylist(playlistId: string): Observable<Playlist> {
    return this.http.get<Playlist>(this.baseUrl.concat('/').concat(playlistId))
      .pipe(map(resp => <Playlist>resp));
  }

  public getPlaylistTracks(playlistId: string): Observable<Tracks> {
    return this.http.get<Tracks>(this.baseUrl.concat('/').concat(playlistId).concat('/tracks'))
      .pipe(map(resp => <Tracks>resp));
  }

  public createPlaylist(playlistName: string, playlistDesc: string) {
    return this.http.post(this.baseUrl, {name: playlistName, description: playlistDesc});
  }

  public deleteTrackFromPlaylist(playlistId: string, trackUri: string) {
    return this.http.request('DELETE', this.baseUrl.concat('/').concat(playlistId).concat('/tracks'),
     {
      body: {
        tracks: [{uri: trackUri}]
      }
    });
  }

  public addTrackToPlaylist(trackUri: string, playlistId: string) {
    return this.http.post(this.baseUrl.concat('/').concat(playlistId).concat('/tracks'),
    { uris: [trackUri]});
  }

  public search(q: string, type: string): Observable<any> {
    return this.http.get('https://api.spotify.com/v1/search?q=' + q + '&type=' + type + '&limit=5')
      .pipe(map(resp => resp));
  }

}
