import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../albums';
import { Subscription } from 'rxjs';
import { Tracks, Track } from '../../track';
import { SpotifyAlbumsService } from '../spotify-albums.service';
import { SpotifyLoginService } from '../../../spotify-login.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
  providers: [ SpotifyAlbumsService ]
})
export class AlbumDetailsComponent implements OnInit {

  @Input() album: Album;

  subscription: Subscription;
  tracks: Tracks;
  tracklist: Track[];

  displayedColumns = ['name', 'preview_url', 'duration_ms'];

  constructor(private spotifyAlbum: SpotifyAlbumsService,
              private spotifyService: SpotifyLoginService) { }

  ngOnInit() {
    if (this.album !== null) {
      this.getAlbumTracks(this.album.id);
    }
  }

  getAlbumTracks(id: string) {
    this.subscription = this.spotifyAlbum.getAlbumTracks(id).subscribe(
        tracks => {
          this.tracks = tracks;
          this.tracklist = tracks.items;
      }
    );
  }

  playTrack(url: string) {
    this.spotifyService.playTrack(url);
  }

}
