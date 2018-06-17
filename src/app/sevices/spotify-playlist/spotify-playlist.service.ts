import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Playlist, Playlists } from '../../models/playlist';
import { SpotifyProfileService } from '../spotify-profile/spotify-profile.service';
import { Profile } from '../../models/profile';
import { Tracks } from '../../models/track';

@Injectable()
export class SpotifyPlaylistService extends SpotifyProfileService {

  profile: Profile;

  constructor(public http: HttpClient) {
    super(http);
  }

  public getPlaylists(): Observable<Playlists> {
    return this.http.get(this.getBaseUrl().concat('/playlists')).pipe(map(resp => <Playlists>resp));
  }

  public getPlaylistTracks(href: string): Observable<Tracks> {
    return this.http.get(href).pipe(map(resp => <Tracks>resp));
  }

  public createPlaylist(playlistName: string, profileId: string) {
    console.log('Service' + playlistName);
    return this.http.post('https://api.spotify.com/v1/users/' + profileId + '/playlists', {name: playlistName}).subscribe(resp => resp);
  }

  public deleteTrackFromPlaylist(playlistId: string, profileId: string, trackUri: string) {
    return this.http.request('DELETE', 'https://api.spotify.com/v1/users/' + profileId + '/playlists/' + playlistId + '/tracks',
     {
      body: {
        tracks: [{uri: trackUri}]
      }
    });
  }

}
