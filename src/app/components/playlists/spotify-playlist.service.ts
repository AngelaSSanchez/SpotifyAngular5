import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpotifyLoginService } from '../../spotify-login.service';
import { PlayTrack } from '../track';

@Injectable()
export class SpotifyPlaylistService {

  baseUrl = 'https://api.spotify.com/users/' + localStorage.getItem('userId') + '/spotify/playlists/';

  constructor(private http: HttpClient, private spotifyUrl: SpotifyLoginService) { }

  public getPlaylists(): Observable<any> {
    return this.http.get(this.spotifyUrl.getBaseUrl().concat('/playlists')).pipe(map(resp => resp));
  }

  public getPlaylistTracks(href: string): Observable<any> {
    return this.http.get(href).pipe(resp => resp);
  }

  public createPlaylist(playlistName: string, profileId: string) {
    console.log('Service' + playlistName);
    return this.http.post('https://api.spotify.com/v1/users/' + profileId + '/playlists', {name: playlistName}).subscribe(resp => resp);
  }

  public deleteTrackFromPlaylist(playlistId: string, profileId: string, trackUri: string) {
    let search = new URLSearchParams();
    search.set('tracks', 'moo');
   // return this.http.delete('https://api.spotify.com/v1/users/' + profileId + '/playlists/' + playlistId + '/tracks', {search})
   // .subscribe(resp => resp);
  }
}
