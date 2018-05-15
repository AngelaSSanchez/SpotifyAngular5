import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { SpotifyLoginService } from '../../spotify-login.service';
import { PlayTrack } from '../track';

@Injectable()
export class SpotifyPlaylistService {

  baseUrl = 'https://api.spotify.com/users/'+localStorage.getItem('userId')+'/spotify/playlists/';

  constructor(private http: HttpClient, private spotifyUrl: SpotifyLoginService) { }

  public getPlaylists(): Observable<any> {
    return this.http.get(this.spotifyUrl.getBaseUrl().concat('/playlists')).map(resp => resp);
  }

  public getPlaylist(id: string): Observable<any> {
    return this.http.get(this.baseUrl.concat(id)).map(resp => resp);
  }

  public getPlaylistTracks(href: string): Observable<any> {
    return this.http.get(href).map(resp => resp);
  }

  public playTrack(params: PlayTrack): Observable<any> {
    return this.http.put('https://api.spotify.com/v1/me/player/play', params).map(resp => resp);
  }
}
