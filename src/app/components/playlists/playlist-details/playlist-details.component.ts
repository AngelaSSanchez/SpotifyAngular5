import { Component, OnInit, Input, Output, OnChanges, OnDestroy, EventEmitter } from '@angular/core';
import { SpotifyPlaylistService } from '../spotify-playlist.service';
import { Playlist } from '../../../models/playlist';
import { Track } from '../../../models/track';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
  providers: []
})
export class PlaylistDetailsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() playlist: Playlist;
  @Output() delTrack = new EventEmitter();
  track: Track;

  tracks: Track[];

  public show: boolean;
  audioElement: any;
  subscription: Subscription;

  constructor(private playlistService: SpotifyPlaylistService) {
    this.show = false;
  }

  ngOnInit() {
    this.audioElement = new Audio();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnChanges() {
    if (this.playlist) {
      this.getTracks();
    }
  }

  getTracks() {
    this.subscription = this.playlistService.getPlaylistTracks(this.playlist.tracks.href).subscribe(
      tracks => {
        this.tracks = tracks.items;
        console.log(this.tracks);
     }
    );
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
   // this.track = track;
    this.delTrack.emit(track);
  }

}
