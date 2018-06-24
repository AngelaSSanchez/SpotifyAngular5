import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';
import { Artists } from '../../models/artists';

@Injectable({
  providedIn: 'root'
})
export class SpotifyProfileService {

  private baseUrl = 'https://api.spotify.com/v1/me';

  constructor(public http: HttpClient) { }

  public getUserProfile(): Observable<User> {
    return this.http.get(this.baseUrl).pipe(map(resp => <User>resp));
  }

  public getUserFollowing(): Observable<Artists> {
    return this.http.get('https://api.spotify.com/v1/me/following?type=artist').pipe(map(resp => <Artists> resp));
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }

  public search(q: string, type: string): Observable<any> {
    console.log('holi' + q + type);
    return this.http.get('https://api.spotify.com/v1/search?q=' + q + '&type=' + type + '&limit=5')
      .pipe(map(resp => resp));
  }
  async getUser() {
    const user = await this.http.get<User>(this.baseUrl).toPromise();
    return user;
  }

}
