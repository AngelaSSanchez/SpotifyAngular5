import { Component, OnInit, OnChanges, OnDestroy, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Playlist, Playlists, TrackLink } from '../../models/playlist';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { SpotifyPlaylistService } from '../../sevices/spotify-playlist/spotify-playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css'],
  providers: [SpotifyPlaylistService],
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  userId: string;
  playlists: Playlists;
  selectedPlaylist: Playlist;
  playlistName: string;

  private subscription: ISubscription;

  constructor(private playlistService: SpotifyPlaylistService,
              public dialog: MatDialog
            ) {
              this.userId = localStorage.getItem('user');
            }

  ngOnInit() {
    this.getPlaylists();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getPlaylists(): Playlists {
    this.subscription = this.playlistService.getPlaylists().subscribe(
      playlists => {
         this.playlists = playlists;
      }
    );

    return this.playlists;
  }

  onSelect(playlist: Playlist) {
    this.selectedPlaylist = playlist;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {
      width: '250px',
      data: { playlistName: this.playlistName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.playlistName = result;
      if (this.playlistName != null) {
        this.createPlaylist(this.playlistName);
      }
    });
  }

  createPlaylist(playlistName: string) {
    this.playlistService.createPlaylist(playlistName, this.userId).subscribe(
      playlists => {
        this.playlists = this.getPlaylists();
      }
    );
  }

  deleteTrack(track) {
    console.log('Track deleted');
    alert('Cancion eliminada de la lista');
  }

}
