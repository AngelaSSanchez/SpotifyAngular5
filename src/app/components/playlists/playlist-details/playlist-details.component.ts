import { Component, OnInit, Input, Output, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { SpotifyPlaylistService } from '../../../sevices/spotify-playlist/spotify-playlist.service';
import { Playlist, TrackLink } from '../../../models/playlist';
import { Track, Tracks } from '../../../models/track';
import { Subscription } from 'rxjs';
import { Profile } from '../../../models/profile';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
  providers: []
})
export class PlaylistDetailsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() playlist: Playlist;
  @Input() playlistTracks: TrackLink;
  @Output() delTrack = new EventEmitter();
  track: Track;
  profile: Profile;

  tracks: Tracks;

  public show: boolean;
  audioElement: any;
  subscription: Subscription;

  constructor(private playlistService: SpotifyPlaylistService) {
    this.show = false;
  }

  ngOnInit() {
    this.audioElement = new Audio();
    this.getProfile();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges() {
    if (this.playlist || this.tracks) {
      this.getTracks();
    }
  }

  getTracks(): Tracks {
    this.subscription = this.playlistService.getPlaylistTracks(this.playlist.tracks.href).subscribe(
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
    this.playlistService.deleteTrackFromPlaylist(this.playlist.id, this.profile.id, track.uri)
    .subscribe(
      tracks => {
        this.tracks = this.getTracks();
      }
    );
    this.delTrack.emit(track);
  }

  getProfile() {
    this.subscription = this.playlistService.getProfile().subscribe(
      profile => {
        this.profile = profile;
     }
    );
  }

}
