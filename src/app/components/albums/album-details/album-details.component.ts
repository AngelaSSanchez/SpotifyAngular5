import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Album } from '../../../models/albums';
import { Subscription } from 'rxjs';
import { Tracks, Track } from '../../../models/track';
import { SpotifyAlbumsService } from '../../../sevices/spotify-album/spotify-albums.service';
import { Playlists } from '../../../models/playlist';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
  providers: [ SpotifyAlbumsService ]
})
export class AlbumDetailsComponent implements OnInit, OnDestroy {

  @Input() album: Album;

  subscription: Subscription;
  tracks: Tracks;
  playlists: Playlists;
  audioElement: any;
  show: boolean;

  displayedColumns = ['name', 'preview_url', 'duration_ms', 'add'];

  constructor(private albumService: SpotifyAlbumsService) {
    this.audioElement = new Audio();
    this.show = false;
  }

  ngOnInit() {
    this.getAlbumTracks();
    this.getPlaylists();
  }

  getAlbumTracks(): Tracks {
    this.subscription = this.albumService.getAlbumTracks(this.album.id).subscribe(
        tracks => {
          this.tracks = tracks;
      }
    );

    return this.tracks;
  }

  playTrack(url: string) {
    this.show = !this.show;

    this.audioElement.src = url;
    if (this.show) {
      this.audioElement.play();
    } else {
      this.audioElement.pause();
    }
  }

  getPlaylists(): Playlists {
    this.subscription = this.albumService.getPlaylists().subscribe(
      playlists => {
         this.playlists = playlists;
      }
    );

    return this.playlists;
  }

  addToPlaylist(trackUri: string, playlistId: string) {
    this.subscription = this.albumService.addTrackToPlaylist(trackUri, playlistId).subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
