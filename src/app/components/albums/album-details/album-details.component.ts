import { Component, OnInit, Input } from '@angular/core';
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
export class AlbumDetailsComponent implements OnInit {

  @Input() album: Album;

  subscription: Subscription;
  tracks: Tracks;
  tracklist: Track[];
  playlists: Playlists;

  displayedColumns = ['name', 'preview_url', 'duration_ms', 'add'];

  constructor(private albumService: SpotifyAlbumsService) { }

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
    this.albumService.playTrack(url);
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

}
