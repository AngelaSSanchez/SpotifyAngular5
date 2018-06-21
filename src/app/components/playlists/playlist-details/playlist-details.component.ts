import { Component, OnInit, Input, Output, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { SpotifyPlaylistService } from '../../../sevices/spotify-playlist/spotify-playlist.service';
import { Playlist, TrackLink } from '../../../models/playlist';
import { Track, Tracks } from '../../../models/track';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css']
})
export class PlaylistDetailsComponent implements OnInit, OnDestroy {

 @Output() delTrack = new EventEmitter();
  track: Track;
  profile: User;
  playlistId: string;
  userId: string;
  playlist: Playlist;

  tracks: Tracks;

  public show: boolean;
  audioElement: any;
  subscription: Subscription;

  constructor(private playlistService: SpotifyPlaylistService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.show = false;
    this.playlistId = '';
    this.userId = localStorage.getItem('user');
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.audioElement = new Audio();
    this.subscription = this.activatedRoute.params.subscribe(
      params => {
        this.playlistId = params['id'];
      }
    );
    if (this.playlistId !== '') {
      this.getPlaylist(this.playlistId);
      this.getTracks(this.playlistId);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPlaylist(id: string): Playlist {
    this.subscription = this.playlistService.getPlaylist(this.userId, id).subscribe(
      playlist => {
        this.playlist = playlist;
      }
    );

    return this.playlist;
  }

  getTracks(id: string): Tracks {
    this.subscription = this.playlistService.getPlaylistTracks(this.userId, id).subscribe(
      tracks => {
        this.tracks = tracks;
        console.log(this.tracks);
     }
    );
    return this.tracks;
  }

  playTrack(src: string) {
    this.playlistService.playTrack(src);
  }

  deleteTrack(track: Track) {
    this.playlistService.deleteTrackFromPlaylist(this.playlistId, this.userId, track.uri)
    .subscribe(
      tracks => {
        this.tracks = this.getTracks(this.playlistId);
      }
    );
    this.delTrack.emit(track);
  }

}
