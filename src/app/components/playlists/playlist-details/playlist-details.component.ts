import { Component, OnInit, Input, OnChanges, OnDestroy } from '@angular/core';
import { SpotifyPlaylistService } from '../spotify-playlist.service';
import { Playlist } from '../playlist';
import { Track, PlayTrack } from '../../track';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist-details.component.html',
  styleUrls: ['./playlist-details.component.css'],
  providers: [SpotifyPlaylistService]
})
export class PlaylistDetailsComponent implements OnInit, OnChanges, OnDestroy {

  @Input() playlist: Playlist;

  tracks: Track[];

  public show:boolean = false;
  audioElement: any;
  contextUri: PlayTrack;
  subscription: Subscription;

  constructor(private playlistService: SpotifyPlaylistService) { }

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

}
