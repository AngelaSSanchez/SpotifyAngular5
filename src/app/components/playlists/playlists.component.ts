import { Component, OnInit, OnDestroy} from '@angular/core';
import { MatDialog } from '@angular/material';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { Playlist, Playlists } from '../../models/playlist';
import { CreatePlaylistComponent } from './create-playlist/create-playlist.component';
import { SpotifyPlaylistService } from '../../sevices/spotify-playlist/spotify-playlist.service';

@Component({
  selector: 'app-playlists',
  templateUrl: './playlists.component.html',
  styleUrls: ['./playlists.component.css']
})
export class PlaylistsComponent implements OnInit, OnDestroy {

  userId: string;
  playlists: Playlists;
  selectedPlaylist: Playlist;
  playlistName: string;
  playlistDesc: string;
  error: string;

  private subscription: ISubscription;

  // Se inyecta el servicio en el componente
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

  openDialog(): void {
    const dialogRef = this.dialog.open(CreatePlaylistComponent, {
      width: '250px',
      data: { playlistName: this.playlistName, playlistDesc: this.playlistDesc }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.playlistName = result.playlistName;
      this.playlistDesc = result.playlistDesc;
      if (this.playlistName != null) {
        this.createPlaylist(this.playlistName, this.playlistDesc);
      }
    });
  }

  createPlaylist(playlistName: string, playlistDesc: string) {
    console.log(this.playlistDesc);
    this.playlistService.createPlaylist(playlistName, playlistDesc, this.userId).subscribe(
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
