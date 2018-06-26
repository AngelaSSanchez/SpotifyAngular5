import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SpotifyProfileService } from '../../sevices/spotify-profile/spotify-profile.service';
import { Artists } from '../../models/artists';
import { Albums } from '../../models/albums';
import { Tracks } from '../../models/track';
import { SpotifyPlaylistService } from '../../sevices/spotify-playlist/spotify-playlist.service';
import { Playlists } from '../../models/playlist';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  q: string;
  type: string;
  object: any = null;
  artists: Artists;
  albums: Albums;
  tracks: Tracks;
  playlists: Playlists;

  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private profileService: SpotifyProfileService,
              private playlistService: SpotifyPlaylistService) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
        };
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe(
      params => {
        this.q = params['q'];
        this.type = params['type'];
      }
    );
    if (this.q != null && this.type != null) {
      this.search();
    }
  }

  search() {
    this.subscription = this.profileService.search(this.q, this.type).subscribe(
      object => {
        this.object = object;
        if (object['artists']) {
          this.artists = object['artists'];
        }
        if (object['albums']) {
          this.albums = object['albums'];
        }
        if (object['artists']) {
          this.tracks = object['tracks'];
        }
        console.log(this.object);
      }
    );
  }

  getPlaylists(): Playlists {
    this.subscription = this.playlistService.getPlaylists().subscribe(
      playlists => {
         this.playlists = playlists;
      }
    );

    return this.playlists;
  }

  addToPlaylist(trackUri: string, playlistId: string) {
    this.subscription = this.playlistService.addTrackToPlaylist(trackUri, playlistId).subscribe();
  }
}
