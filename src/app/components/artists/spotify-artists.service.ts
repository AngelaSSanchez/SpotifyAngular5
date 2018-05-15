import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Tracks } from '../track';

@Injectable()
export class SpotifyArtistsService {

  private baseUrl = 'https://api.spotify.com/v1/artists/';

  constructor(public http: HttpClient) { }

  public getArtistTopTracks(id: string): Observable<Tracks> {
    return this.http.get(this.baseUrl.concat(id).concat('/top-tracks?country=ES')).map(resp => <Tracks>resp);
  }
  public getArtistAlbums(id: string): Observable<any> {
    return this.http.get(this.baseUrl.concat(id).concat('/albums')).map(resp => resp);
  }

  public followArtists(id: string) {
    return this.http.put('https://api.spotify.com/v1/me/following?type=artist&ids='+id, null).subscribe(resp => resp);
  }
}
