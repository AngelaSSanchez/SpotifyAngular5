import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from './components/track';

@Injectable()
export class SpotifyLoginService {

  private scopes = 'user-read-private user-read-email user-follow-modify';

  private baseUrl = 'https://api.spotify.com/v1/me';

  public show = false;
  audioElement = new Audio();

  constructor(public http: HttpClient) { }

  public getUrl(): string {
    return 'https://accounts.spotify.com/authorize?client_id=&scope='
     + encodeURIComponent(this.scopes) + '&redirect_uri=http://localhost:4200/callback&response_type=token';
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getProfile(): Observable<Profile> {
    return this.http.get(this.baseUrl).pipe(map(resp => <Profile>resp));
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getPlaylists(): Observable<any> {
    return this.http.get(this.baseUrl.concat('/playlists')).pipe(map(resp => resp));
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
