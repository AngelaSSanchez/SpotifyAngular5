import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Playlist, Playlists } from '../../models/playlist';
import { SpotifyProfileService } from '../spotify-profile/spotify-profile.service';
import { Tracks } from '../../models/track';

@Injectable()
export class SpotifyPlaylistService {

  userId: string;
  public show = false;
  audioElement = new Audio();

  constructor(public http: HttpClient) {
    this.userId = localStorage.getItem('user');
  }

  public getPlaylists(): Observable<Playlists> {
    return this.http.get('https://api.spotify.com/v1/me/playlists').pipe(map(resp => <Playlists>resp));
  }

  public getPlaylist(userId, id): Observable<Playlist> {
    return this.http.get('https://api.spotify.com/v1/users/' + userId + '/playlists/' + id).pipe(map(resp => <Playlist>resp));
  }

  public getPlaylistTracks(userId: string, id: string): Observable<Tracks> {
    return this.http.get('https://api.spotify.com/v1/users/' + userId + '/playlists/' + id + '/tracks')
    .pipe(map(resp => <Tracks>resp));
  }

  public createPlaylist(playlistName: string, userId: string) {
    console.log('Service' + playlistName);
    return this.http.post('https://api.spotify.com/v1/users/' + userId + '/playlists', {name: playlistName});
  }

  public deleteTrackFromPlaylist(playlistId: string, userId: string, trackUri: string) {
    return this.http.request('DELETE', 'https://api.spotify.com/v1/users/' + userId + '/playlists/' + playlistId + '/tracks',
     {
      body: {
        tracks: [{uri: trackUri}]
      }
    });
  }

  public addTrackToPlaylist(trackUri: string, playlistId: string) {
    return this.http.post('https://api.spotify.com/v1/users/' + this.userId + '/playlists/' + playlistId + '/tracks',
    { uris: [trackUri]});
  }

  playTrack(src: string) {
    this.show = !this.show;

    this.audioElement.src = src;
    if (this.show) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
  }

}
