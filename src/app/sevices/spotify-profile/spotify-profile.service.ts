import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class SpotifyProfileService {

  private baseUrl = 'https://api.spotify.com/v1/me';

  public show = false;
  audioElement = new Audio();

  constructor(public http: HttpClient) { }

  public getProfile(): Observable<User> {
    return this.http.get(this.baseUrl).pipe(map(resp => <User>resp));
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public getPlaylists(): Observable<any> {
    return this.http.get(this.baseUrl.concat('/playlists')).pipe(map(resp => resp));
  }

  async getUser() {
    const user = await this.http.get<User>(this.baseUrl).toPromise();
    return user;
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
