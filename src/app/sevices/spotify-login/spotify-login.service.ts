import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Profile } from '../../models/profile';

@Injectable()
export class SpotifyLoginService {

  private scopes = 'user-read-private user-read-email user-follow-modify';

  constructor(public http: HttpClient) { }

  public getUrl(): string {
    return 'https://accounts.spotify.com/authorize?client_id=&scope='
     + encodeURIComponent(this.scopes) + '&redirect_uri=http://localhost:4200/callback&response_type=token';
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

}
