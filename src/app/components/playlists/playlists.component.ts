import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { SpotifyLoginService } from '../../spotify-login.service';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { SpotifyPlaylistService } from './spotify-playlist.service';
import { Playlist } from './playlist';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers: [SpotifyPlaylistService],
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  token: string;
  username: string;
  profile: any;
  playlists: Playlist[];
  selectedPlaylist: Playlist;

  private subscription: ISubscription;

  constructor(private spotifyService: SpotifyLoginService,
              private playlistService: SpotifyPlaylistService
            ) { }

  ngOnInit() {
    this.getProfileData();
    this.getPlaylists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getProfileData() {
    this.subscription = this.spotifyService.getProfile().subscribe(
      profile => this.profile = profile
    );
  }

  getPlaylists() {
    this.subscription = this.playlistService.getPlaylists().subscribe(
      results => {
         this.playlists = results.items;
         console.log(this.playlists);
      }
    );
  }

  onSelect(playlist: Playlist) {
    this.selectedPlaylist = playlist;
  }

}
