import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { SpotifyLoginService } from '../../spotify-login.service';
import { Playlist, Playlists } from '../../models/playlist';
@Injectable()
export class SpotifyPlaylistService {

  baseUrl = 'https://api.spotify.com/users/' + localStorage.getItem('userId') + '/spotify/playlists/';

  constructor(private http: HttpClient, private spotifyUrl: SpotifyLoginService) { }

  public getPlaylists(): Observable<Playlists> {
    return this.http.get(this.spotifyUrl.getBaseUrl().concat('/playlists')).pipe(map(resp => <Playlists>resp));
  }

  public getPlaylistTracks(href: string): Observable<any> {
    return this.http.get(href).pipe(resp => resp);
  }

  public createPlaylist(playlistName: string, profileId: string) {
    console.log('Service' + playlistName);
    return this.http.post('https://api.spotify.com/v1/users/' + profileId + '/playlists', {name: playlistName}).subscribe(resp => resp);
  }

  public deleteTrackFromPlaylist(playlistId: string, profileId: string, trackUri: string, index: number) {
    const uri = decodeURIComponent('[{"uri": "' + trackUri + '", "positions": [' + index.toString() + ']}]');
    console.log('Uri' + uri);
    const params = new HttpParams().append('tracks', uri);
    console.log('param' + params);
    return this.http.delete('https://api.spotify.com/v1/users/' + profileId + '/playlists/' + playlistId + '/tracks',
     {params})
    .subscribe(resp => resp);
  }
}
