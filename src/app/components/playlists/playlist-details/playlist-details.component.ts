import { Component, OnInit, Output, OnDestroy, EventEmitter } from '@angular/core';
import { SpotifyPlaylistService } from '../../../sevices/spotify-playlist/spotify-playlist.service';
import { Playlist, TrackLink } from '../../../models/playlist';
import { Track, Tracks } from '../../../models/track';
import { Subscription } from 'rxjs';
import { User } from '../../../models/user';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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
    this.audioElement = new Audio();
    this.userId = localStorage.getItem('user');
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
    this.subscription = this.activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {
        this.playlistId = params.get('id');
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
    this.subscription = this.playlistService.getPlaylist(id).subscribe(
      playlist => {
        this.playlist = playlist;
        console.log(this.playlist);
      }
    );

    return this.playlist;
  }

  getTracks(id: string): Tracks {
    this.subscription = this.playlistService.getPlaylistTracks(id).subscribe(
      tracks => {
        this.tracks = tracks;
     }
    );
    return this.tracks;
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

  deleteTrack(track: Track) {
    this.playlistService.deleteTrackFromPlaylist(this.playlistId, track.uri)
    .subscribe(
      tracks => {
        this.tracks = this.getTracks(this.playlistId);
      }
    );
    this.delTrack.emit(track);
  }

}
