import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artists } from '../../models/artists';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyFollowService {

  baseUrl = 'https://api.spotify.com/v1/me/following';

  constructor(private http: HttpClient) { }

  public getUserFollowing(): Observable<Artists> {
    return this.http.get<Artists>(this.baseUrl.concat('?type=artist'));
    // .pipe(map(resp => <Artists> resp));
  }

  public followArtists(artistId: string) {
    return this.http.put(this.baseUrl.concat('?type=artist&ids=').concat(artistId), null);
  }

  public checkFollowingArtist(artistId: string) {
    return this.http.get(this.baseUrl.concat('/contains?type=artist&ids=').concat(artistId));
  }

  public unfollowArtists(artistId: string) {
    return this.http.delete(this.baseUrl.concat('?type=artist&ids=').concat(artistId));
  }
}
