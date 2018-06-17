import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../../../models/albums';
import { Subscription } from 'rxjs';
import { Tracks, Track } from '../../../models/track';
import { SpotifyAlbumsService } from '../../../sevices/spotify-album/spotify-albums.service';

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

  constructor(private albumService: SpotifyAlbumsService) { }

  ngOnInit() {
    if (this.album !== null) {
      this.getAlbumTracks(this.album.id);
    }
  }

  getAlbumTracks(id: string) {
    this.subscription = this.albumService.getAlbumTracks(id).subscribe(
        tracks => {
          this.tracks = tracks;
          this.tracklist = tracks.items;
      }
    );
  }

  playTrack(url: string) {
    this.albumService.playTrack(url);
  }

}
