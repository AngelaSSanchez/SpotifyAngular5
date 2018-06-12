import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SpotifyLoginService {

  private scopes = 'user-read-private user-read-email user-follow-modify';

  private baseUrl = 'https://api.spotify.com/v1/me';

  constructor(public http: HttpClient) { }

  public getUrl(): string {
    return 'https://accounts.spotify.com/authorize?client_id=&scope='
     + encodeURIComponent(this.scopes) + '&redirect_uri=http://localhost:4200/callback&response_type=token';
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public getProfile() {
    return this.http.get(this.baseUrl).pipe(map(resp => resp));
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getPlaylists(): Observable<any> {
    return this.http.get(this.baseUrl.concat('/playlists')).pipe(map(resp => resp));
  }
}
