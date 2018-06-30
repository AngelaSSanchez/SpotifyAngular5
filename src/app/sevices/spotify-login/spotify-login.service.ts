import { Injectable } from '@angular/core';

@Injectable()
export class SpotifyLoginService {

  private scopes = 'user-read-private user-read-email user-follow-modify user-follow-read';
  CLIENT_ID = '';

  constructor() { }

  public getUrl(): string {
    return 'https://accounts.spotify.com/authorize?client_id=' + this.CLIENT_ID + '&scope='
     + encodeURIComponent(this.scopes) + '&redirect_uri=http://localhost:4200/callback&response_type=token';
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

}
