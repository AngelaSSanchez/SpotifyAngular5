import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
export class SearchResultsComponent implements OnInit, OnDestroy {

  q: string;
  type: string;
  object: any = null;
  artists: Artists;
  albums: Albums;
  tracks: Tracks;
  playlists: Playlists;
  show: boolean;
  audioElement: any;

  subscription: Subscription;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private playlistService: SpotifyPlaylistService) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
          return false;
        };
        this.show = false;
        this.audioElement = new Audio();
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.q = params.get('q');
        this.type = params.get('type');
      }
    );

    if (this.q != null && this.type != null) {
      this.search();
      this.getPlaylists();
    }
  }

  search() {
    this.subscription = this.playlistService.search(this.q, this.type).subscribe(
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

  playTrack(src: string) {
    this.show = !this.show;

    this.audioElement.src = src;
    if (this.show) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
