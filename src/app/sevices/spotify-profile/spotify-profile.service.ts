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
    return this.http.get<User>(this.baseUrl);
    // .pipe(map(resp => <User>resp));
  }

  async getUser() {
    const user = await this.http.get<User>(this.baseUrl).toPromise();
    return user;
  }

}
